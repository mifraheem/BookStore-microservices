package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"
)

func main() {
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
	// Define your service URLs
	authServiceURL, _ := url.Parse("http://localhost:8000/")
	catalogServiceURL, _ := url.Parse("http://localhost:5000/")
	orderServiceURL, _ := url.Parse("http://localhost:3000/")

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
