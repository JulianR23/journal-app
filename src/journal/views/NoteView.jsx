import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { setActiveNote, startSavingNote } from '../../store/journal';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'


export const NoteView = () => {

    const dispatch = useDispatch();

    const {active: note, messageSaved, isSaving} = useSelector(state => state.journal);

    const {body, title, onInputChange, formState, date} = useForm(note);

    const dateString = useMemo(() => {
        const Newdate = new Date(date)
        return Newdate.toUTCString();
    }, [date])

    useEffect(() => {
      dispatch(setActiveNote(formState))
        
    }, [formState])

    useEffect(() => {
      dispatch(setActiveNote(formState))
        if(messageSaved > 0){
            Swal.fire('nota actualizada', messageSaved, 'sucess');
        }
    }, [messageSaved])
    
    const onSaveNote = () =>{
        dispatch(startSavingNote())
    }

  return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
        className='animate__animated animate__fadeIn animate__faster'
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
        </Grid>
        <Grid item>
            <Button
             disabled= {isSaving}
             onClick={onSaveNote}
             color="primary"
             sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name={title}
                value = {title}
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name = {body}
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}
