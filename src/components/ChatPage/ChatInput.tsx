import React, { FormEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Box from '@mui/material/Box';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type clickHandlerProps = {
    message:string,
    file?: {
        data:File,
        fileName:string | undefined
    }
}
export  type chatInputType = {
    submitHandler: ({message, file}:clickHandlerProps) => void,
    onInput: (e:React.FormEvent<HTMLDivElement>) => void
}

function ChatInput({submitHandler, onInput}: chatInputType) {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState('');
    const [showSelectedFile, setShowSelectedFile] = useState(false);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if(file){
            submitHandler({message, file:{data:file,fileName:file?.name}});
        }else{
            submitHandler({message});

        }
        setMessage('');
        setFile(null);
        setFileUrl('');
    }

    const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            files && setFile(files[0])
            setFileUrl(URL.createObjectURL(files[0]))
        }
        e.target.value = ''

    }

    return (
        <Box component={'form'} onSubmit={onSubmit} className={'input_wrapper'}>
            {showSelectedFile && fileUrl && <Box className={'preview_image'} onClick={() => setShowSelectedFile(false)}>
                <img src={fileUrl}/>
            </Box>}
            {file && <Box className={'file_name'}
                          onClick={() => setShowSelectedFile(true)}
            >
                <Typography children={'Selected file: ' + file?.name} className={'file_name'}/>
                <DeleteOutlineOutlinedIcon onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setFileUrl('')
                }}/>
            </Box>}
            <Box display={'flex'} borderRadius={10} className={'input_wrapper_flex'}><TextField
                autoFocus={true}
                className={'input'}
                maxRows={4}
                multiline={true}
                label={null}
                value={message}
                onInput={(e)=>onInput(e)}
                onChange={(e)=>setMessage(e.target.value)}
                inputProps={{maxLength: 100}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">Message:</InputAdornment>,
                }}
                variant="standard"
            />
                <Button component="label" variant="outlined" startIcon={<AttachFileIcon/>}>
                    <input onChange={fileSelect} type={'file'} hidden={true}/>
                </Button>
                <Button disabled={!message && !file} type={'submit'} children={<>Send <SendTwoToneIcon/></>}
                        variant={'outlined'}/>
            </Box>
        </Box>
    );
}

export default ChatInput;