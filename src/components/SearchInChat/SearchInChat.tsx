import React, { useEffect, useState } from 'react';
import './SearchInChat.scss';
import TextField from '@mui/material/TextField';
import { DebounceInput } from 'react-debounce-input';
import { messageSearchResult } from '../../Types/Chat';
import { Avatar, Badge, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';

type PropsType = {
    show: boolean,
    onSearch: (value: string) => void,
    searchResult: [messageSearchResult] | []
}

function SearchInChat({show, onSearch, searchResult}: PropsType) {
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        if (!show) {
            setSearchValue('')
        }
    }, [show])

    const onChange = (value: string) => {
        setSearchValue(value)
        onSearch(value)
    }

    return (
        <div className={show ? 'search_wrapper show' : 'search_wrapper'}>
            <DebounceInput
                placeholder={'Start typing'}
                debounceTimeout={500}
                onChange={(e) => onChange(e.target.value)}
                value={searchValue}
                id={'search_messages'}
                className={'input_wrapper'}
                label="Search messages"
                element={TextField}
                autoComplete={'false'}/>

            {searchResult.length ? <div className={'search_result'}>
                {searchResult.map(item => {
                    return (
                        <ListItem
                            divider={true}
                            key={item.id}
                            className={'search_result_item'}
                        >
                            <Avatar src={item.user.file_path}/>
                            <div className={'name_message'}>
                                {item.user.first_name}
                                <Typography className={'last_message'}
                                            children={item.message}/>
                            </div>

                        </ListItem>
                    )
                })}
            </div>:null}
        </div>
    );
}

export default SearchInChat;