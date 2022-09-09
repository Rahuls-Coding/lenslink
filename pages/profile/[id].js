import { useRouter } from 'next/router'
import {useState, useEffect } from 'react';
import {client, getProfiles} from '../../api'
import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'

export default function Profile() {
    const router = useRouter()
    const { id } = router.query
    const [profile, setProfile] = useState([]);    

    useEffect(() => {
        if (id) {
        fetchProfile()

        }
    }, [id])


    const fetchProfile = async () => {
        try {
            const response = await client.query(getProfiles, {id: id}).toPromise()
            // console.log(response.data.profiles.items)
            setProfile(response.data.profiles.items)
        } catch (error) {
            console.log({error})
        }
    } 


    return( 
        
            profile.map((profile, i) => (
            profile.name 
        ?

            <div className='profile' key={i}>
            <div className='coverpicture'>
                { profile.coverPicture 
                    ? 
                        <img src={profile.coverPicture.original.url} className='profile-pic' /> 
                    : 
                        <div className='no-profile-pic'>
                        </div>
                }
              </div>
              <div className='profile-intro'>
                <h3 className='profile-title'>{profile.name}</h3>
                <p className='profile-description'>{profile.bio}</p>
              </div> 
            </div> 
  
        :
        null
      ))
        
    )
}
