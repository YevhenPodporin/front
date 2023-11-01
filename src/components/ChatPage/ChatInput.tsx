import React, { FormEvent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import Box from '@mui/material/Box';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Typography from '@mui/material/Typography';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useParams } from 'react-router-dom';
import useRecordAudio from '../../api/hooks/useRecordAudio';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

export type clickHandlerProps = {
    message: string,
    file?: {
        data: File | Blob,
        fileName: string | undefined
    }
}
export  type chatInputType = {
    submitHandler: ({message, file}: clickHandlerProps) => void,
    onInput: () => void
}

function ChatInput({submitHandler, onInput}: chatInputType) {
    const {id} = useParams();
    const [message, setMessage] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState('');
    const [showSelectedFile, setShowSelectedFile] = useState(false);
    const {result, stopRecording, isRecording, startRecording, clearState} = useRecordAudio();

    useEffect(() => {
        setMessage('');
        setFile(null);
        setFileUrl('');
        setShowSelectedFile(false)
    }, [id])

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!message && !file && !result) return;
        if (file || result) {
            if(file){
                submitHandler({
                    message, file: {
                        data:file,
                        fileName: file?.name || 'voice-record'
                    }
                });
            }else if(result){
                submitHandler({
                    message, file: {
                        data:result,
                        fileName: String(Math.floor(Math.random() * 1000000))
                    }
                });
            }

        } else {
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
            {result &&
                <Box className={'file_name'}
                >
                    <audio controls src={URL.createObjectURL(result)}/>
                    <DeleteOutlineOutlinedIcon onClick={(e) => {
                        e.stopPropagation();
                        clearState()
                    }}/>
                </Box>
            }
            <Box display={'flex'} borderRadius={10} className={'input_wrapper_flex'}>
                <TextField
                    autoFocus={true}
                    className={'input'}
                    maxRows={4}
                    multiline={true}
                    label={null}
                    value={message}
                    onChange={(e) => {
                        if (e.target.value) {
                            onInput()
                        }
                        setMessage(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSubmit(e)
                        }
                    }}
                    inputProps={{maxLength: 100}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Message:</InputAdornment>,
                    }}
                    variant="standard"
                />
                {!result && <Button component="label" variant="outlined" style={{maxHeight: 'max-content'}}
                                    startIcon={<AttachFileIcon/>}>
                    <input onChange={fileSelect} type={'file'} hidden={true}/>
                </Button>}

                <Button
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        if (message || file || result) return
                        startRecording();
                    }}
                    onMouseUp={(e) => {
                        e.stopPropagation();
                        if (message || file || result) return
                        stopRecording();
                    }}
                    type={'submit'}
                    variant={'outlined'}
                    className={!message && isRecording ? "recording__voice" : 'message'}
                >
                    {message || file || result ? <SendTwoToneIcon/> : <KeyboardVoiceIcon/>}
                </Button>

            </Box>
        </Box>
    );
}

export default ChatInput;