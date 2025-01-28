// You're working on implementing a health-monitoring system. As part of that, you need tokeep track of users' health statistics.
pub struct User{
    name: String,
    age: u32,
    height: f32,
    visit_count: usize,
last_blood_pressure: Option<u32,u32>,
//Contain a valid blood pressure reading: Some((systolic, diastolic))
//Or indicate the absence of a reading: None.

}

pub struct Measurements {
    height: f32,
    blood_pressure: (u32, u32),
    }

    pub struct HealthReport<'a> {
    //The 'a lifetime is only applied to patient_name because it is the only field in the struct that references data stored elsewhere,
    //and the lifetime ensures that the borrowed string (&str) lives long enough for the struct to use it
    patient_name: &'a str,
    visit_count: u32,
    height_change: f32,
    blood_pressure_change: Option<(i32, i32)>,
    }//visit_count, height_change, and blood_pressure_change, are owned types (or types that do not involve borrowing), so they do not require lifetimes.
    impl User {//Self refers to the struct that contains the new function.
        pub fn new(name: String, age: u32, height: f32)-> Self {
            Self { name, age, height, visit_count: 0, last_blood_pressure: None }
            }
//Self {} is the syntax for constructing an instance of the struct
//Self { name, age, height, visit_count: 0, last_blood_pressure: None }, you're creating a new instance of the struct with values assigned to its fields.
pub fn visit_doctor(&mut self, measurements: Measurements)-> HealthReport {
    //mut self in the method signature indicates that the method requires mutable access to the instance of the struct on which it is being called
    //Whenever a method modifies the state of a struct (i.e., changes its fields), you use &mut self
    self.visit_count += 1;
    let bp = measurements.blood_pressure;
    let report = HealthReport {
    patient_name: &self.name,
    visit_count: self.visit_count as u32,
    height_change: measurements.height- self.height,
    blood_pressure_change: match self.last_blood_pressure {
    Some(lbp) => {
    Some((bp.0 as i32- lbp.0 as i32, bp.1 as i32- lbp.1 as i32))
    }
    None => None,
    },
    };
    self.height = measurements.height;
    self.last_blood_pressure = Some(bp);
    report
    }
    }
    fn main() {
        let bob = User::new(String::from("Bob"), 32, 155.2);
        println!("I'm {} and my age is {}", bob.name, bob.age);
        }
        fn test_visit() {
        let mut bob = User::new(String::from("Bob"), 32, 155.2);
        assert_eq!(bob.visit_count, 0);
        let report =
        bob.visit_doctor(Measurements { height: 156.1, blood_pressure: (120, 80) });
        assert_eq!(report.patient_name, "Bob");
        assert_eq!(report.visit_count, 1);
        assert_eq!(report.blood_pressure_change, None);
        assert!((report.height_change- 0.9).abs() < 0.00001);
        let report =
        bob.visit_doctor(Measurements { height: 156.1, blood_pressure: (115, 76) });
        assert_eq!(report.visit_count, 2);
        assert_eq!(report.blood_pressure_change, Some((-5,-4)));
        assert_eq!(report.height_change, 0.0);
        }