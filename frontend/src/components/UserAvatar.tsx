import { Avatar } from '@material-ui/core'
import React from 'react'
import { useMeQuery } from "../hooks/useMeQuery"

function UserAvatar() {
  const { isLoading, error, data } = useMeQuery()
  return (
    <Avatar>
      {
        (isLoading || error) ?
          "U"
          :
          // @ts-ignore
          data?.data?.name[0] + data?.data?.surname[0] || "U"
      }
    </Avatar>
  )
}

export default UserAvatar
