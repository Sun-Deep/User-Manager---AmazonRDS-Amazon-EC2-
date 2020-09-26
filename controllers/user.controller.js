const con = require('../config/db')

const list = (req, res) => {
    con.query("SELECT * FROM users", (error, results, fields) => {
        if(error){
            res.end(error)
        }else{
            res.render('index', {users: results})
        }
    })
}

const registerForm = (req, res) => {
    res.render('register')
}

const register = (req, res) => {
    const user = req.body
    
    con.query("INSERT INTO users (full_name, email, address) VALUES (?, ?, ?)", 
        [user.fullname, user.email, user.address], (error, results, fields) => {
            if(error){
                console.log(error)
                res.redirect('/users/register')
            }else{
                console.log("Saved Successfully..")
                res.redirect('/users')
            }
    })
}

const updateForm = (req, res) => {
    const id = req.params.id
    
    con.query("SELECT * FROM users WHERE id = ?", 
        [id], (error, results, fields) => {
            if(error){
                console.log(error)
            }else{
                res.render('edit', {user: results[0]})
            }
        })
}

const update = (req, res) => {
    const user = req.body
    
    con.query("UPDATE users SET full_name = ?, email = ?, address = ? WHERE id = ?",
        [user.fullname, user.email, user.address, user.id], (error, results, fields) => {
            if(error){
                console.log(error)
            }else{
                console.log('Updated Successfully..')
                res.redirect('/users')
            }
        })
}

const remove = (req, res) => {
    const id = req.params.id

    con.query("DELETE FROM users WHERE id = ?", 
        [id], (error, results, fields) => {
            if(error){
                console.log(error)
                res.redirect('/users')
            }else{
                console.log("Deleted Successfully..")
                res.redirect('/users')
            }
        })
}

module.exports = { register, list, registerForm, update, updateForm, remove }