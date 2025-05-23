from flask import Flask, request, jsonify, abort
from flask_migrate import Migrate
from flask import request, jsonify
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError

from functools import wraps
from models import db, Product
import os
import pika, json
from flask import current_app
from threading import Thread
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_cors import CORS
import time
base_dir = os.path.abspath(os.path.dirname(__file__))
env_path = os.path.join(base_dir, '.env')  

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///catalog.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'default-secret-key')
app.config['RABBITMQ_HOST'] = os.getenv('RABBITMQ_HOST', 'rabbitmq')
db.init_app(app)
migrate = Migrate(app, db)



def start_consumer():
    for attempt in range(10):
        try:
            print(f"Trying to connect to RabbitMQ (attempt {attempt+1})...")
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(current_app.config['RABBITMQ_HOST'])
            )
            channel = connection.channel()
            channel.queue_declare(queue='product_updates')

            def callback(ch, method, properties, body):
                try:
                    data = json.loads(body)
                    product_id = data['product_id']
                    in_stock = data['in_stock']
                    with app.app_context():
                        session = Session()
                        update_product_stock(product_id, in_stock, session)
                except Exception as e:
                    print(f"Error processing message: {e}")

            channel.basic_consume(queue='product_updates', on_message_callback=callback, auto_ack=True)
            print(' [*] Waiting for messages. To exit press CTRL+C')
            channel.start_consuming()
            break  # Exit loop after successful connection

        except pika.exceptions.AMQPConnectionError as e:
            print(f"RabbitMQ connection error: {e}")
            time.sleep(5)  # wait 5 seconds before retry
        except Exception as e:
            print(f"Unhandled exception: {e}")
            time.sleep(5)


def update_product_stock(product_id, in_stock, session):
    try:
        product = session.get(Product,product_id)
        if product:
            product.in_stock = in_stock
            session.commit()
            print(f"Updated product {product_id} stock status to {in_stock}")
    except Exception as e:
        session.rollback()
        print(f"Error updating product stock: {e}")
    finally:
        session.close()


def validate_token(token):
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        return payload
    except ExpiredSignatureError:
        abort(401, description='Token has expired')
    except InvalidTokenError:
        abort(403, description='Invalid token')


def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or 'Bearer ' not in auth_header:
            return jsonify({'message': 'Authorization token is missing or invalid.'}), 403
        token = auth_header.split(' ')[1]
        try:
            payload = validate_token(token)
            current_user_id = payload['user_id']
        except jwt.InvalidTokenError as e:
            return jsonify({'message': 'Invalid token', 'error': str(e)}), 403
        return f(current_user_id, *args, **kwargs)
    return decorated_function






@app.route('/products', methods=['POST'])
@token_required
def create_product(current_user_id):
    data = request.get_json()

    # Check for required fields in the JSON data
    if 'name' not in data or 'description' not in data or 'price' not in data:
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if the price is not None
    if data['price'] is None:
        return jsonify({'message': 'Price cannot be null'}), 400

    new_product = Product(
        name=data['name'],
        description=data['description'],
        price=data['price'],  # Make sure price is provided and not None
        author_id=current_user_id
    )
    db.session.add(new_product)
    try:
        db.session.commit()
        return jsonify({'message': 'Product created', 'product_id': new_product.id}), 201
    except sqlalchemy.exc.IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500



@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'in_stock': product.in_stock, 'author':product.author_id} for product in products])

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify({'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'in_stock': product.in_stock})

@app.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    product.name = data.get('name', product.name)
    product.description = data.get('description', product.description)
    product.price = data.get('price', product.price)
    product.in_stock = data.get('in_stock', product.in_stock)
    db.session.commit()
    return jsonify({'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price, 'in_stock': product.in_stock})

@app.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'}), 204

def start_background_consumer():
    with app.app_context():
        global Session
        Session = scoped_session(sessionmaker(bind=db.engine))
        start_consumer()

# Start the background thread for RabbitMQ consumer
thread = Thread(target=start_background_consumer, daemon=True)
thread.start()



if __name__ == '__main__':

    app.run(host="0.0.0.0", port=5000, debug=True)