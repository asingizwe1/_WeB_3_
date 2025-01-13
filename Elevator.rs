#[derive(Debug)]
enum Event{
/// A button was pressed.
ButtonPressed(Button),
/// The car has arrived at the given floor.
CarArrived(Floor),
/// The car's doors have opened.
CarDoorOpened,
/// The car's doors have closed.
CarDoorClosed,

}
/// A floor is represented as an integer.
type Floor = i32;
enum Direction{
Up,
Down,

}

enum Button {
    /// A button in the elevator lobby on the given floor.
    LobbyCall(Direction, Floor),
    /// A floor button within the car.
    CarFloor(Floor),
    }



//car arrived on given floor
fn car_arrived(floor:i32)-> Event{
    Event::CarArrived(floor)
}

fn car_door_opened()-> Event{
    Event::CarDoorOpened

}

fn car_door_opened()-> Event {
    Event::CarDoorOpened

    }

    fn car_door_closed()-> Event {
        Event::CarDoorClosed
        }

        fn lobby_call_button_pressed(floor: i32, dir: Direction)-> Event {
            Event::ButtonPressed(Button::LobbyCall(dir, floor))
            }

            fn car_floor_button_pressed(floor: i32)-> Event {
                Event::ButtonPressed(Button::CarFloor(floor))
                }
                fn main() {
                    println!(
                    "A ground floor passenger has pressed the up button: {:?}",
                    lobby_call_button_pressed(0, Direction::Up)
                    );
                    println!("The car has arrived on the ground floor: {:?}", car_arrived(0));
                    println!("The car door opened: {:?}", car_door_opened());
                    println!(
                    "A passenger has pressed the 3rd floor button: {:?}",
                    car_floor_button_pressed(3)
                    );
                    println!("The car door closed: {:?}", car_door_closed());
                    println!("The car has arrived on the 3rd floor: {:?}", car_arrived(3));
                    }