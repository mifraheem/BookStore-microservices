import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="button button-primary">
            Go Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;