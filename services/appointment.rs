/*Patients creating appointments
Doctors viewing their scheduled appointment */

//Step 1: Data Design
//You need an Appointment struct (model),

/*create_appointment(new_appointment: NewAppointment)
get_appointments_for_doctor(doctor_id: Uuid) */

use crate::db::get_db_pool;
use crate::models::appointment::{Appointment, NewAppointment};
use chrono::Utc;
use sqlx::query_as;
use uuid::Uuid;

pub async fn create_appointment(app: NewAppointment) -> Result<(), sqlx::Error> {
    let pool = get_db_pool();
    sqlx::query!(
        r#"
        INSERT INTO appointments (id, patient_id, doctor_id, date_time, reason, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        "#,
        Uuid::new_v4(),
        app.patient_id,
        app.doctor_id,
        app.date_time,
        app.reason,
        Utc::now()
    )
    .execute(pool)
    .await?;
    Ok(())
}

pub async fn get_appointments_for_doctor(doctor_id: Uuid) -> Result<Vec<Appointment>, sqlx::Error> {
    let pool = get_db_pool();
    let appointments = query_as!(
        Appointment,
        r#"
        SELECT id, patient_id, doctor_id, date_time, reason, created_at
        FROM appointments
        WHERE doctor_id = $1
        ORDER BY date_time ASC
        "#,
        doctor_id
    )
    .fetch_all(pool)
    .await?;

    Ok(appointments)
}
