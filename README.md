*🐾* PetCare App*

A simple Full Stack web app to manage pets, built using *Spring Boot, **Angular, **MySQL, and **Bootstrap*.

## 🚀 Features
- Add, edit, delete pet records
- View medical history & care tips
- Next vet visit reminders
- Search pets by name/species
- Basic login system

## 🛠 Tech Stack
- Backend: Spring Boot, Java, MySQL, Lombok
- Frontend: Angular, Bootstrap, HTML/CSS

## 🔌 API Endpoints

### Pet
- GET /api/pets – Get all pets  
- GET /api/pets/{id} – Get pet by ID  
- POST /api/pets – Add pet  
- PUT /api/pets/{id} – Update pet  
- DELETE /api/pets/{id} – Delete pet  

### Auth
- POST /api/auth/login – Login check

## ▶ Run the App

```bash
# Start Backend (Spring Boot)
cd backend
mvn spring-boot:run

# Start Frontend (Angular)
cd frontend
npm install
ng serve
