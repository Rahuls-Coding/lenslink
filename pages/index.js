import {useState, useEffect } from 'react';
import {client, recommendedProfiles} from '../api'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {

  const [profiles, setProfiles] = useState([]);

  useEffect(() =>{
    fetchProfiles()
  }, [])


  async function fetchProfiles() {
    try {
    const response = await client.query(recommendedProfiles).toPromise()
    // console.log({response})
    console.log(response.data.recommendedProfiles)
    setProfiles(response.data.recommendedProfiles)
    } catch (error) {
      console.log({error})
    }
  }


  return (

      profiles.map((profile, i) => (
        // <Link href={`/profile/${profile.id}`} key={i}>
          <a key={i}>
            <div className=''>
           <div className=''>
              { profile.coverPicture ? <img src={profile.coverPicture.original.url} className='profile-pic' /> : null }
              </div>
              <div className=''>
                <h3>{profile.name}</h3>
                <p>{profile.bio}</p>
              </div> 
            </div> 
          </a>
        //</Link>
      ))
      

  )
}
