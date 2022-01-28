import { Avatar, Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'
import { List } from "react-virtualized";
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const listHeight = 600;
const rowHeight = 50;
const rowWidth = 800;

export default function ListComponent(props) {
    const { list } = props
    const renderRow = ({ index, key, style }) => {
        return (
                 <Card key={key} style={{ width: 300, height: 120, marginRight: 20, marginBottom: 5, borderRadius: 12, borderColor: 'rgba(0, 0, 0, 0.12)', borderWidth: 1, borderStyle: 'solid' }} elevation={0}>
                 <CardContent>
                     <Typography variant="subtitle1" gutterBottom>
                        {list[index].name}
                     </Typography>
                     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                         <Typography variant="h4" gutterBottom>
                             0
                         </Typography>
                         <Avatar variant="rounded" style={{ backgroundColor: 'rgb(30, 136, 229)', borderRadius: 20 }} >
                             <DesktopWindowsIcon />
                         </Avatar>
                     </div>
                 </CardContent>
             </Card>
        )
    }
    return (
   
            <List
                width={rowWidth}
                height={listHeight}
                rowHeight={rowHeight}
                rowRenderer={renderRow}
                rowCount={list.length} />
    
    )
}
