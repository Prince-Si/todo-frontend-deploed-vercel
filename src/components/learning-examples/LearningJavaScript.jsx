
//lets create and object
const person = {
    name: 'Ranga',
    address: {
        line1: 'Baker Street',
        city: 'London',
        country: 'UK'
    },
    profiles: ['twitter','linkedin', 'instagram'], //array
    printProfile: () => {
        person.profiles.map(
            (profile) => {
                console.log(profile);
            }
        )
        //console.log(person.profiles[0]); //arrow function/ anonymous similar to lambda function of java
    }
}

export default function LearningJavaScript() {
    return (
        <>
            <div>{person.name}</div>
            <div>{person.address.city}</div>
            <div>{person.profiles[0]}</div>
            <div>{person.printProfile()}</div>
        </>
    )
}