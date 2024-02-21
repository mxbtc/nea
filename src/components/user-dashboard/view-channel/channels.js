"use client"
import styles from './modal.module.css'
import Link from 'next/link'
import { BoxArrowUpRight } from 'react-bootstrap-icons'
import { useState, useEffect } from 'react'
import LeaveButton from '../leave/button'

function View({ id }) {
     return <Link href={"/dashboard/channels/" + id}><BoxArrowUpRight color={"white"} className={styles.viewChannel}/></Link>
 }

function Table({ channels, userId, toggleView }) {
     

     return (
          <table id={styles.channels}>
               <thead>
                    <tr className={styles.tableHead} >
                         <th>Channel Name</th>
                         <th>Invite ID</th>
                         <th>View</th>
                         <th>Leave</th>
                    </tr>
               </thead>
               <tbody>
               {
                    channels.map(channel => { // loop over channels, making a table row which includes the channel data.
                         return (
                         <tr className={styles.tableRow} key={channel.id}>
                              <td>{channel.name}</td>
                              <td>{channel.inviteId}</td>
                              <td><View id={channel.id.toString()}/></td>
                              <td><LeaveButton channelId={channel.id.toString()} userId={userId} toggleView={toggleView}/></td>
                         </tr>
                         )
                    })
               }
               </tbody>
          </table>
     )
}

export default function ViewChannels ({ channels, userId, toggleView }) {
     const [isClient, setClient] = useState(false)
     useEffect(() => {
          setClient(true)
     }, [])
     return isClient && <Table channels={channels} userId={userId} toggleView={toggleView}/>
}