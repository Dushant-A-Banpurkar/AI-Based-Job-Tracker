import type React from "react";
import {ClerkProvider, useAuth, useUser} from "@clerk/clerk-react"

export function clerkWrapper({children}:{children:React.ReactNode}){
    return (
        <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
            {children}
        </ClerkProvider>
    )
}

export function useClerkAuth(){
    const {isSignedIn,isLoaded}=useAuth();

    const {user}=useUser();

    return{
        isAuthenticated: isSignedIn,
        user:user
        ?{
            id:user.id,
            username:user?.username,
            email:user?.primaryEmailAddress?.emailAddress
        }
        :null,
        isLoaded:!isLoaded,
        login:()=>{
            window.location.href='/login'
        },
        logout:()=>{
            window.location.href='/logout'
        }
    }
}