'use client' // We make sure the form is loaded in the client side, as we are manipulating window data
import { useEffect, useState } from 'react' // both of these hooks allow us to track data and perform effects on the client side on the client side
import styles from './form.module.css' // Imported stylesheet
import { Trash3Fill, PencilSquare  } from 'react-bootstrap-icons' // Imported icons
import Link from 'next/link'

function EditButton ({ id }) { // Button to edit user
    return <Link href={"/admin/dashboard/employees/" + id + "/edit"}><PencilSquare color={"white"} className={styles.editButton}/></Link>
}

function DeleteButton({ id }) { // button to delete employee
    return <Link href={"/admin/dashboard/employees/" + id + "/delete"}><Trash3Fill color={"white"} className={styles.deleteButton}/></Link>
}

function Table({ employees }) {
    return (
        <table id={styles.employees}> {/* table to display employee data */}
            <thead>
                <tr className={styles.tableHead} >
                    <th>Name</th>
                    <th>Email</th>
                    <th>Permission Level</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {
                employees.map(employee => { // loop over employees, making a table row which includes the employee data.
                    return (
                        <tr className={styles.tableRow} key={employee._id.toString()} eid={employee._id.toString()} uid={employee.userId.toString()}>
                            <td>{employee.username}</td>
                            <td>{employee.email}</td>
                            <td>{employee.permissionLevel}</td>
                            <td><EditButton id={employee._id.toString()}/></td>
                            <td><DeleteButton id={employee._id.toString()}/></td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

function PreEmployeeTable() {

    let [employees, setEmployees] = useState([]); // track filtered employees
    let [filter, setFilter] = useState("")  // track the filter content

    async function getEmployees() {

        let url = '/api/employees/get'
        
        let res = await fetch(url).then(r => r.json()) // fetch all employees

        let employeesNew = res.employees // store employees in variable

        let filtered = employeesNew.filter(employee => { // filter employees
            let email = employee.email
            let username = employee.name || employee.username
            // check both usernames and emails to see if they include the filter, if they do return the item else discard it
            if (email.toLowerCase().includes(filter.toLowerCase()) || username.toLowerCase().includes(filter.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        })

        setEmployees(filtered) // set filtered employees
    }

    useEffect(() => { // runs on initial client render to get employees
        getEmployees()
    }, [])

    useEffect(() => { // runs every time when filter changes
        getEmployees()
    }, [filter])


    return <section id={styles.section}>
                <div id={styles.headBar}>
                    <div>
                        <h2>Management Dashboard - View All Employees</h2>
                        <Link id={styles.addEmployee} href={'/admin/dashboard/employees/add-employee'}>Add Employee</Link>
                    </div>
                    {/*                                                                   track value every time input changes    */}
                    <div><input type={"text"} placeholder={"Search..."}
                     id={styles.employeeFilter} onChange={e => setFilter(e.target.value)} value={filter}/></div>
                </div>
                <div id={styles.tableContainer}>
                    <Table employees={employees}/>
                </div>
            </section>
}

export default function UserTable() {
    const [isClient, setClient] = useState(false) // Hook which allows us to check if client has loaded 
    // This hook runs on the initial render to show that the client has loaded
    useEffect(() => {
        setClient(true)
    }, [])
    // return component when client is loaded
    return <>
        { isClient && <PreEmployeeTable/> }
        </>
}