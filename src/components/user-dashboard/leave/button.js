"use client"
import styles from './button.module.css'
import { BoxArrowRight } from 'react-bootstrap-icons'
import buttonAction from './buttonAction'
import { toast } from 'react-toastify'

export default function LeaveButton({ userId, channelId, toggleView }) {

    async function clientAction(userId, channelId) {
        let res = await buttonAction(userId, channelId)

        if (res.error) {
            toast.error(res.message)
            return;
        }
        
        toast.success(`Your have left!`)
        setTimeout(() => {
          toggleView("view")
        }, 200)
    }

     return <BoxArrowRight color={"white"} onClick={() => clientAction(userId, channelId) } className={styles.leaveChannel}/>
}