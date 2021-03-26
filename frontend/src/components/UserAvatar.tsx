import { Avatar } from '@material-ui/core'
import React, { FC } from 'react'
import { useMeQuery } from "../hooks/useMeQuery"

const UserAvatar: FC<{ size?: number }> = (props) => {
  const { isLoading, error, data } = useMeQuery()
  return (
    <Avatar style={ props.size ? { width: props.size, height: props.size} : {} }>
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
