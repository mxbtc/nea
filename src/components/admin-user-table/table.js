'use client' // We make sure the form is loaded in the client side, as we are manipulating window data
import { useEffect, useState } from 'react' // both of these hooks allow us to track data and perform effects on the client side on the client side
import styles from './form.module.css' // Imported stylesheet
import { Trash3Fill, PencilSquare  } from 'react-bootstrap-icons' // Imported icons
import Link from 'next/link'

function EditButton ({ id }) {
    return <Link href={"admin/dashboard/" + id + "/edit"}><PencilSquare color={"white"} className={styles.editButton}/></Link>
}

function DeleteButton({ id }) {
    return <Link href={"admin/dashboard/" + id + "/delete"}><Trash3Fill color={"white"} className={styles.deleteButton}/></Link>
}

function Table({ users }) {
    return (
        <table id={styles.users}> {/* table to display user data */}
            <thead>
                <tr className={styles.tableHead} >
                    <th>Name</th>
                    <th>Email</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                users.map(user => { // loop over users, making a table row which includes the user data.
                    return (
                        <tr className={styles.tableRow} key={user._id.toString()} uid={user._id.toString()}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td><EditButton id={user._id.toString()}/></td>
                            <td><DeleteButton id={user._id.toString()}/></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

function PreUserTable() { 

    let [users, setUsers] = useState([]);
    let [filter, setFilter] = useState("")

    useEffect(() => {

        async function getUsers(filter) {

            let url = '/api/users/get-all'

            if (filter && filter !== "") {
                url = url + "?" + new URLSearchParams({filter: filter})
            }
            
            let res = await fetch(url).then(r => r.json())

            setUsers(res.users)
        
        }

        getUsers(filter)

    }, [filter])


    return <section id={styles.section}>
                <div id={styles.headBar}>
                    <div>
                        <h2>Management Dashboard</h2>
                    </div>
                    
                    <div><input type={"text"} placeholder={"Search.."}
                    id={styles.userFilter} onChange={e => setFilter(e.target.value)} value={filter}/></div>
                </div>
                <div id={styles.tableContainer}>
                    <Table users={users}/>
                </div>
            </section>
}

export default function UserTable() {
    const [isClient, setClient] = useState(false) // Hook which allows us to check if client has loaded 
    // This hook runs on the initial render to show that the client has loaded
    useEffect(() => {
        setClient(true)
    }, [])
    return <>
        { isClient && <PreUserTable/> }
        </>
}