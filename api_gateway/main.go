package main

import (
	"fmt"
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
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Error loading .env file")
	}
	http.HandleFunc("/", handleRequestAndRedirect)
	log.Println("Server starting on port 8080...\n\n\thttp://localhost:8080/")
	log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))

}

func handleRequestAndRedirect(w http.ResponseWriter, r *http.Request) {
	targetURL, err := getProxyURL(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	proxy := httputil.NewSingleHostReverseProxy(targetURL)
	proxy.ServeHTTP(w, r)
}

func getProxyURL(path string) (*url.URL, error) {
	// Retrieve service URLs from environment variables
	authServiceURL, _ := url.Parse(os.Getenv("AUTH_SERVICE"))
	catalogServiceURL, _ := url.Parse(os.Getenv("CATALOG_SERVICE"))
	orderServiceURL, _ := url.Parse(os.Getenv("ORDER_SERVICE"))

	switch {
	case strings.HasPrefix(path, "/auth"):
		return authServiceURL, nil
	case strings.HasPrefix(path, "/products"):
		return catalogServiceURL, nil
	case strings.HasPrefix(path, "/orders"):
		return orderServiceURL, nil
	default:
		return nil, fmt.Errorf("404 not found: no route matches path '%s'", path)
	}
}
