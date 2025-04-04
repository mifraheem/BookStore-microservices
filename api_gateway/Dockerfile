# ---- Stage 1: Build Stage ----
  FROM golang:1.23-alpine AS builder

  # Set the Current Working Directory inside the container
  WORKDIR /app
  
  # Copy go.mod and go.sum files and download dependencies
  COPY go.mod go.sum ./
  RUN go mod download
  
  # Copy the rest of the application code
  COPY . .
  
  # Build the Go application
  RUN go build -o main .
  
  # ---- Stage 2: Runtime Stage ----
  FROM alpine:latest
  
  # Set the Current Working Directory
  WORKDIR /root/
  
  # Copy the built binary from the builder stage
  COPY --from=builder /app/main .
  COPY --from=builder /app/.env .

  # Expose application port (if required)
  EXPOSE 8080
  
  # Start the server
  CMD ["./main"]
  