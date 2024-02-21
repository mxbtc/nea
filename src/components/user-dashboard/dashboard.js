"use client"
import { useState, useEffect } from 'react'
import { Tooltip } from 'react-tooltip'
import styles from './dashboard.module.css'
import ChannelsList from './view-channel/channels'
import CreateChannelForm from './create-channel/form'
import JoinChannelForm from './join-channel/form'
import { InfoCircleFill } from 'react-bootstrap-icons'
import { SessionProvider } from 'next-auth/react'

export default function Dashboard ({ userId }) {
    const [filter, setFilter] = useState("") // Track filter value
    const [viewChannelActive, setViewChannelActive] = useState(true) // check to see which section is open
    const [createChannelActive, setCreateChannelActive] = useState(false)
    const [joinChannelActive, setJoinChannelActive] = useState(false)
    const [isClient, setIsClient] = useState(false) // is client loaded?
    const [channels, setChannels] = useState([]) // array of user's channels, including filtered 


    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {

        async function getChannels(filter) {
            try {
                let url = '/api/channels/get' // api route
        
                let res = await fetch(url).then(r => r.json()) // fetch channels
        
                let newChannels = res.data
        
                let filtered = newChannels.filter(channel => {
                    let name = channel.name
                    // check names to see if they include the filter, if they do return the item else discard it
                    if (name.toLowerCase().includes(filter.toLowerCase())) {
                        return true;
                    } else {
                        return false;
                    }
                })
        
                setChannels(filtered)
            } catch (e) {
                setChannels([])
            }
            
        }

        getChannels(filter)

    }, [filter, viewChannelActive]) // occur on first render, when filter changes and when view is toggled

    function toggleSectionView (sectionName) {
        setViewChannelActive(sectionName === "view") // see all channels
        setCreateChannelActive(sectionName === "create") // form to create
        setJoinChannelActive(sectionName === "join") // form to join
    }


    return (
        isClient && <>
            <section id={styles.section}>
                <div id={styles.headBar}>
                    <div>
                    <Tooltip id="my-tooltip" style={{maxWidth: "450px"}} />
                        <h2>
                            Dashboard
                            { viewChannelActive && " - View All Channels"}
                            { createChannelActive && " - Create a Channel"}
                            { joinChannelActive && " - Join a Channel"}
                        </h2>
                        { viewChannelActive && 
                            <InfoCircleFill 
                                height={"20px"} width={"20px"}
                                data-tooltip-id={"my-tooltip"}
                                data-tooltip-content={"See all channels here. Share the Invite ID to add others!"}
                                data-tooltip-place={"bottom"}
                                data-tooltip-variant={"light"}
                            />
                        }
                        { createChannelActive && 
                            <InfoCircleFill 
                                height={"20px"} width={"20px"}
                                data-tooltip-id={"my-tooltip"}
                                data-tooltip-content={`This form is to create your own group chat (known as a channel). Just enter your desired name, and press submit. If your name is fine, 
                                then you will get a popup with the invite code. Make sure you remember it!`}
                                data-tooltip-place={"bottom"}
                                data-tooltip-variant={"light"}
                            />
                        }
                        { joinChannelActive &&
                            <InfoCircleFill 
                                height={"20px"} width={"20px"}
                                data-tooltip-id={"my-tooltip"}
                                data-tooltip-content={"Enter your invite ID to join a channel!"}
                                data-tooltip-place={"bottom"}
                                data-tooltip-variant={"light"}
                            />
                        }
                    </div>
                    {/* track value every time inputs change    */}
                    <div>
                        <button id={styles.viewChannelButton}   active={ viewChannelActive.toString()   } onClick={ () => toggleSectionView("view") }   >View Channels  </button>
                        <button id={styles.createChannelButton} active={ createChannelActive.toString() } onClick={ () => toggleSectionView("create") } >Create Channel </button>
                        <button id={styles.joinChannelButton}   active={ joinChannelActive.toString()   } onClick={ () => toggleSectionView("join") }   >Join Channel   </button>
                        <input type={"text"} placeholder={"Search..."}
                        id={styles.channelFilter} onChange={e => setFilter(e.target.value)} value={filter}/>
                    </div>
                </div>
                <div id={styles.container}>
                    <SessionProvider>
                        { /* Show component depending on which view is active */ }
                        { viewChannelActive && <ChannelsList channels={channels} userId={userId} toggleView={toggleSectionView}/> }
                        { createChannelActive && <CreateChannelForm toggleView={toggleSectionView}/> }
                        { joinChannelActive && <JoinChannelForm toggleView={toggleSectionView}/> }
                    </SessionProvider>

                </div>
            </section>
        </>
        
    )
}