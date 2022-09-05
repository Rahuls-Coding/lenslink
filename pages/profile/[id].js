import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter()
    const { id } = router.query
    
    return <div>Profile: {id}</div>
    
}
