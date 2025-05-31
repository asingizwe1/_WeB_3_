// handlers/patient.rs
use crate::services;
use actix_web::{HttpResponse, Responder, web};

pub async fn register_patient(info: web::Json<NewPatient>) -> impl Responder {
    match services::patient::add_patient(info.into_inner()).await {
        Ok(_) => HttpResponse::Ok().body("Patient added successfully"),
        Err(_) => HttpResponse::InternalServerError().body("Failed to add patient"),
    }
}
