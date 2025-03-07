package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load("../.env"); err != nil {
		log.Fatal("Error loading .env file")
	}
	http.HandleFunc("/", handleRequestAndRedirect)
	log.Println("Server starting on port 6000...\n\n\thttp://localhost:6000/")
	log.Fatal(http.ListenAndServe(":6000", nil))

}

func handleRequestAndRedirect(w http.ResponseWriter, r *http.Request) {
	targetURL := getProxyURL(r.URL.Path)
	proxy := httputil.NewSingleHostReverseProxy(targetURL)
	proxy.ServeHTTP(w, r)
}

func getProxyURL(path string) *url.URL {
	// Retrieve service URLs from environment variables
	authServiceURL, _ := url.Parse(os.Getenv("AUTH_SERVICE"))
	catalogServiceURL, _ := url.Parse(os.Getenv("CATALOG_SERVICE"))
	orderServiceURL, _ := url.Parse(os.Getenv("ORDER_SERVICE"))

	switch {
	case strings.HasPrefix(path, "/auth") || strings.HasPrefix(path, "/login") || strings.HasPrefix(path, "/register"):
		return authServiceURL
	case strings.HasPrefix(path, "/products"):
		return catalogServiceURL
	case strings.HasPrefix(path, "/orders"):
		return orderServiceURL
	default:
		return authServiceURL
	}
}
