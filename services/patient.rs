// services/patient.rs
use crate::db::get_db_pool;
use crate::models::patient::NewPatient;
use sqlx::query;

pub async fn add_patient(patient: NewPatient) -> Result<(), sqlx::Error> {
    let pool = get_db_pool();
    query("INSERT INTO patients (name, age) VALUES ($1, $2)")
        .bind(&patient.name)
        .bind(patient.age)
        .execute(pool)
        .await?;
    Ok(())
}
