import React, { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { MessageObj } from 'boc';

type Props = {
  msg: MessageObj;
  setMsg: Dispatch<SetStateAction<MessageObj>>;
};

export const MessageBox: React.FC<Props> = (props) => {
  const type = props.msg.type?.toLowerCase();

  useEffect(() => {
    if (props.msg.text) {
      const timer = setTimeout(
        () => {
          props.setMsg({ text: '', type: '' });
        },
        type === 'error' ? 10000 : 4000
      );

      return () => clearTimeout(timer);
    }
  }, [props.msg, props.setMsg]);

  switch (type) {
    case 'error':
      return (
        <div className='message-box danger overflow-hidden'>
          <div className='w-full p-3 inline-flex justify-between items-center '>
            <p className='ml-2'>{props.msg.text}</p>
            <button
              className='px-3 py-1 border rounded-full danger'
              onClick={() => props.setMsg({ text: '', type: '' })}>
              x
            </button>
          </div>
          <div
            className='h-1 bg-red-500 rounded-full'
            style={{ animation: 'shrink 10s linear forwards' }}
          />
        </div>
      );
    case 'info':
    case 'note':
      return (
        <div className='message-box overflow-hidden'>
          <div className='w-full p-3'>
            <p className='ml-2'>{props.msg.text}</p>
          </div>
          <div
            className='h-1 bg-black/[.1] rounded-full'
            style={{ animation: 'shrink 4s linear forwards' }}
          />
        </div>
      );
    default:
      return null;
  }
};
