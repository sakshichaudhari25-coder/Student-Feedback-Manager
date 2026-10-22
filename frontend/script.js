const form=document.getElementById("feedbackForm")
const btn=document.getElementById("btn")

form.addEventListener("submit",async(e)=>{
    e.preventDefault()

    const name=document.getElementById("name").value
    const rate=document.getElementById("rating").value
    const comment=document.getElementById("comment").value

    const response=await fetch("/submit-feedback",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            rate:rate,
            comment:comment
        })
    })
    
    const data=await response.json()
    console.log(data);

    form.reset()
})