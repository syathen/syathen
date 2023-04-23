// Sample run-helloworld is a minimal Cloud Run service.
package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"

	firebase "firebase.google.com/go"
	ulid "github.com/oklog/ulid/v2"
	"google.golang.org/api/iterator"
)

type request struct {
	CompanyID string `json:"company_id"`
}

type Company struct {
	Name      string `json:"name"`
	CompanyID string `json:"companyId"`
	Email     string `json:"email"`
	Active    bool   `json:"active"`
}

type Location struct {
	Name       string `json:"name"`
	CompanyID  string `json:"company_id"`
	LocationID string `json:"location_id"`
	Image      string `json:"image_id"`
}

type Employee struct {
	FirstName  string   `json:"first_name"`
	LastName   string   `json:"last_name"`
	EmployeeID string   `json:"employee_id"`
	Email      string   `json:"email"`
	Service    []string `json:"services"`
	CompanyID  string   `json:"company_id"`
	LocationID string   `json:"location_id"`
	Image      string   `json:"image_id"`
	Meta       struct {
		LastUpdated string `json:"last_updated"`
		CreatedDate string `json:"created_date"`
		Active      bool   `json:"active"`
	} `json:"meta"`
}

var projectID = "syathen-dbc18"

// var locations []Location
// var employees []Employee

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Starting Instance: %s", ulid.MustNew(ulid.Now(), nil).String())

	http.HandleFunc("/locations/", getLocations)
	http.HandleFunc("/location/", getLocation)
	http.HandleFunc("/company/", getCompany)
	http.HandleFunc("/employees/", getEmployees)
	http.HandleFunc("/employee/", getEmployee)
	http.HandleFunc("/service/", getService)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte("syathen API"))
	})

	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func response(w http.ResponseWriter, s int, message interface{}) int {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(s)
	json.NewEncoder(w).Encode(message)
	return s
}

func getCompany(w http.ResponseWriter, r *http.Request) {
	var companyId = strings.Split(r.URL.Path, "/")[2]
	var company Company
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: projectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	iter := client.Collection("companyProfile").Where("companyId", "==", companyId).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate: %v", err)
		}
		if doc.Data()["name"].(string) == "" {
			response(w, http.StatusNotFound, "Company not found")
			return
		}
		company = Company{
			Name:      doc.Data()["name"].(string),
			CompanyID: doc.Data()["companyId"].(string),
			Email:     doc.Data()["email"].(string),
			Active:    doc.Data()["active"].(bool),
		}
	}

	response(w, http.StatusCreated, company)
}

func getLocations(w http.ResponseWriter, r *http.Request) {
	var companyId = strings.Split(r.URL.Path, "/")[2]

	var emptyLocations []map[string]interface{}
	emptyLocations = nil
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: projectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	iter := client.Collection("locations").Where("company_id", "==", companyId).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate: %v", err)
		}
		emptyLocations = append(emptyLocations, doc.Data())
	}

	response(w, http.StatusCreated, emptyLocations)
}

func getLocation(w http.ResponseWriter, r *http.Request) {
	var locationId = strings.Split(r.URL.Path, "/")[2]

	var req request

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Printf("Request: %+v", req)

	ctx := context.Background()
	conf := &firebase.Config{ProjectID: projectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	location, err := client.Collection("locations").Doc(locationId).Get(ctx)
	if err != nil {
		log.Fatalf("Failed to get location: %v", err)
	}
	if location.Data()["name"].(string) == "" {
		response(w, http.StatusNotFound, "Location not found")
		return
	}

	response(w, http.StatusCreated, location.Data())
}

func getEmployees(w http.ResponseWriter, r *http.Request) {
	var locationId = strings.Split(r.URL.Path, "/")[2]

	var employees []map[string]interface{}
	employees = nil
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: projectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	iter := client.Collection("employeeProfile").Where("location_id", "==", locationId).Documents(ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			log.Fatalf("Failed to iterate: %v", err)
		}
		employees = append(employees, doc.Data())
	}

	response(w, http.StatusCreated, employees)
}

func getEmployee(w http.ResponseWriter, r *http.Request) {
	var employeeId = strings.Split(r.URL.Path, "/")[2]

	ctx := context.Background()
	conf := &firebase.Config{ProjectID: projectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	employee, err := client.Collection("employeeProfile").Doc(employeeId).Get(ctx)
	if err != nil {
		log.Fatalf("Failed to get employee: %v", err)
	}
	if employee.Data()["name"].(string) == "" {
		response(w, http.StatusNotFound, "Employee not found")
		return
	}

	response(w, http.StatusCreated, employee.Data())
}

func getService(w http.ResponseWriter, r *http.Request) {
	var serviceId = strings.Split(r.URL.Path, "/")[2]

	ctx := context.Background()
	conf := &firebase.Config{ProjectID: projectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		log.Fatalln(err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalln(err)
	}
	defer client.Close()

	service, err := client.Collection("serviceList").Doc(serviceId).Get(ctx)
	if err != nil {
		log.Fatalf("Failed to get service: %v", err)
	}
	if service.Data()["serviceId"] == nil {
		response(w, http.StatusNotFound, "Service not found")
		return
	}

	response(w, http.StatusCreated, service.Data())
}
