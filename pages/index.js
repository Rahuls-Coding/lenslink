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
        profile.name 
        ?
        <Link href={`/profile/${profile.id}`} key={i}>
          <a>
            <div className='profile'>
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
          </a>
        </Link>
        :
        null
      ))
      

  )
}
