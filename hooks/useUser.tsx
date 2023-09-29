import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react'

type Props = {}

const useUser = () => {
    const [user, setUser] = useState(null as any);
    const [userDetails, setUserDetails] = useState(null as any);

    const supabase = createClientComponentClient()

    useEffect(() => {
        supabase.auth.getUser().then((res) => {
            console.log(res.data)
            if (!res.error && res.data.user) {
                setUser(res.data.user)
                supabase.from('users').select().eq('userid', res.data.user.id).then((res1) => {
                    console.log(res1.data)
                    if (res1.data)
                        setUserDetails(res1.data[0])
                })
            } else {
                setUserDetails(null)
                setUser(null)
            }
        })
    }, [])

    if (user && userDetails) {
        return { user: user, userDetails: userDetails }
    } else {
        return null
    }
}

export default useUser