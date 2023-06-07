import React from 'react'

type Props = {
    children: string
}

function AdminProtected({ children }: Props) {
    return (
        <div>AdminProtected</div>
    )
}

export default AdminProtected