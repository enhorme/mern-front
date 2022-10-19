import React, { useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';

export const AddPost = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const onChange = React.useCallback((value) => {
    setValue(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  function handleSubmit() {
    const tagsArr = tags.trim().split(' ');
    const data = {
      title,
      text: value,
      tags: tagsArr,
    };
    axios
      .post('/posts', data)
      .then((res) => console.log(res))
      .catch((e) => console.warn(e));
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large">
        Загрузить превью
      </Button>
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок статьи..."
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Тэги"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={value}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={handleSubmit}>
          Опубликовать
        </Button>
        <Button size="large">Отмена</Button>
      </div>
    </Paper>
  );
};
