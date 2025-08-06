import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(state => state.journal);
  console.log(active)
  const onCLicknewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      {!!active ? <h1>NoteView</h1> : <h1>NothingSelectedView</h1>}

      
      {/* <NoteView /> */}


      <IconButton
      onClick={onCLicknewNote}
      disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
