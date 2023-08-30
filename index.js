 const Joi = require("joi")

const express = require("express")
const app = express()
app.use(express.json());

const courses = [
    {id : 1, name : "tech book"},
    {id : 2, name : "Java book"},
    {id : 3, name : "Science book"}
]

// handling  get request

app.get('/api/courses', (req,res) => {
    res.send(courses)
}) 

app.get('/api/courses/:id', (req,res) => {
   const course =  courses.find(c => c.id === parseInt(req.params.id))
   if(!course) return res.status(404).send(`Course with the given id  not found`)
   res.send(course)
})

// handling post request

app.post('/api/courses', (req,res) =>{

    const {error}= ValidateCourse(req.body)
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    

    const course = {
        id: courses.length + 1,
        name : req.body.name
    }

    courses.push(course)
    res.send(course)
})

// handlgn put request

app.put('/api/courses/:id', (req,res) => {
    const course =  courses.find(c => c.id === parseInt(req.params.id))
   if(!course) return res.status(404).send(`Course with the given id  not found`)

  
const {error}= ValidateCourse(req.body)

if (error) {
    res.status(400).send(error.details[0].message);
    return;
}

// updating the course 

course.name = req.body.name;
res.send(course);
   
   

})

// handling delete

app.delete('/api/courses/:id',(req,res) =>{

    const course = courses.find(c => c.id === parseInt(req.params.id))

    if(!course) return res.status(404).send(" the id provided not found sorry ")
    res.send(course)

    const index  = courses.indexOf(course)
    courses.splice(index,1)

    res.send(course)

})


function ValidateCourse(course){
    const schema = {
        name: Joi.string().min(3).required() 
    };
    
    return Joi.validate(course , schema); 
    


}


app.listen("3000" ,() => console.log("Listening on port: 3000"))
