import React, { useState, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';

import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import { X } from 'lucide-react';

import { sendMail } from '@/redux/slices/logs-slice';
import Button from '../Button';

interface EmailComposerInterface {
  email: string;
}

const EmailComposer: React.FC = ({ email }: EmailComposerInterface) => {
  const [to, setTo] = useState<string[]>([email]);
  const [cc, setCc] = useState<string[]>(['info@novatoresols.com']);
  const [bcc, setBcc] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [showCc, setShowCc] = useState<boolean>(true);
  const [showBcc, setShowBcc] = useState<boolean>(false);
  const [showRecipientLabel, setShowRecipientLabel] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const params = useSearchParams();
  const id = params.get('id');

  const handleEmailAddition = (
    e: KeyboardEvent<HTMLInputElement>,
    setEmails: React.Dispatch<React.SetStateAction<string[]>>,
    emails: string[]
  ) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newEmail = (e.target as HTMLInputElement).value.trim();
      if (newEmail && !emails.includes(newEmail)) {
        setEmails([...emails, newEmail]);
      }
      (e.target as HTMLInputElement).value = '';
      setShowRecipientLabel(false);
    }
  };

  const handleEmailRemove = (
    emailToRemove: string,
    setEmails: React.Dispatch<React.SetStateAction<string[]>>,
    emails: string[]
  ) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const handleFocusOnSubjectOrBody = () => {
    if (to.length === 0) {
      setShowRecipientLabel(true);
    }
  };

  const handleSend = () => {
    setLoading(true);
    console.log({
      to,
      cc,
      bcc,
      subject,
      body,
      attachments,
    });

    const payload = {
      to,
      cc,
      bcc,
      subject,
      body,
      attachments,
    };

    const formData = new FormData();

    formData.append(`to`, JSON.stringify(to));
    formData.append(`cc`, JSON.stringify(cc));
    formData.append(`bcc`, JSON.stringify(bcc));

    // Append subject and body
    formData.append('subject', payload.subject);
    formData.append('body', payload.body);

    // Append each file in attachments
    attachments.forEach((file) => {
      formData.append('attachments', file);
    });

    if (to?.length > 0 && body != '' && subject != '') {
      dispatch(sendMail({ id, data: formData }))
        .then(() => {
          toast.info('Email Sent Successfully');
          setLoading(false);
          handleDelete();
        })
        .catch(() => {
          setLoading(false);
          handleDelete();
        });
    }
  };

  const handleDelete = () => {
    setTo([]);
    setCc([]);
    setBcc([]);
    setSubject('');
    setBody('');
    setAttachments([]);
    setIsVisible(false);
  };

  const removeFile = (index: number) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const validateFileExtension = (fileName: string): boolean => {
    const supportedFileExtensions = [
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
      'txt',
      'jpg',
      'jpeg',
      'png',
      'gif',
      'bmp',
      'zip',
      'rar',
      'csv',
      'ics',
    ];

    const fileExtension = fileName.split('.').pop()?.toLowerCase(); // Get the file extension
    return supportedFileExtensions.includes(fileExtension || '');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((file) =>
        validateFileExtension(file.name)
      );
      if (validFiles.length < files.length) {
        toast.error(
          'One or more files have unsupported extensions. Please upload valid files.'
        );
      }

      if (validFiles.length > 0) {
        setAttachments((prev) => [...prev, ...validFiles]);
      }
    }
  };

  const customFileUploadButton = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*'; // Adjust the file types as needed
    input.onchange = handleFileChange;
    input.click();
  };

  if (!isVisible) return null;

  return (
    <div>
      {!isMinimized && (
        <div
          className={`${
            isMinimized
              ? 'h-[600px]'
              : isFullScreen
                ? 'w-[1000px] h-[600px]'
                : 'max-w-[600px] w-[600px]'
          } fixed mx-auto bg-white shadow-lg rounded-lg mt-10 border ${
            isFullScreen
              ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              : 'bottom-0 right-4'
          } transition-all duration-300`}
          style={{
            zIndex: 1000,
            height: 'auto',
            maxHeight: '600px',
            overflowY: 'auto',
          }} // Adjust this line
        >
          {/* Header  */}
          <div className="border-b p-2 flex justify-between items-center bg-[#424242] rounded-tl-[8px] rounded-br-none rounded-tr-[8px] rounded-bl-none">
            <h2 className="text-[14px] font-medium text-white">New Message</h2>
            <div className="space-x-3 flex">
              <button onClick={() => setIsMinimized(!isMinimized)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M2.75 11.2085H12.75V13.2085H2.75V11.2085Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </button>
              <button onClick={() => setIsFullScreen(!isFullScreen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13 7.44444V3H8.55556L10.3833 4.82778L4.82778 10.3833L3 8.55556V13H7.44444L5.61667 11.1722L11.1722 5.61667L13 7.44444Z"
                    fill="white"
                    fillOpacity="0.6"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-[#FFFFFF99]"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="p-2 flex flex-col h-full">
            <div className="  border-b ">
              {/* To Input */}
              <div className="flex items-center mb-2 ">
                <label
                  htmlFor="to"
                  className={`w-[70px] font-medium transition-all ${showRecipientLabel && to.length === 0 ? 'text-[#0000008A]' : 'text-[#000000]'}
                            `}
                >
                  {showRecipientLabel && to.length === 0 ? 'Recipients' : 'To'}
                </label>
                <div className="flex-grow flex flex-wrap items-center  p-1 ">
                  {to.map((email, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2 mb-1 flex items-center"
                    >
                      {email}
                      <button
                        onClick={() => handleEmailRemove(email, setTo, to)}
                        className="ml-1 text-blue-500 hover:text-blue-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    className="focus:outline-none flex-grow"
                    placeholder=""
                    onKeyDown={(e) => handleEmailAddition(e, setTo, to)}
                    onFocus={() => setShowRecipientLabel(false)}
                  />
                </div>
                {/* CC &Bcc buttons */}
                <div className="ml-4 flex gap-2">
                  <button
                    onClick={() => setShowCc(!showCc)}
                    className="text-[#0000008A] hover:underline"
                  >
                    Cc
                  </button>
                  <button
                    onClick={() => setShowBcc(!showBcc)}
                    className="text-[#0000008A] hover:underline"
                  >
                    Bcc
                  </button>
                </div>
              </div>
              {/* Cc Input */}
              {showCc && (
                <div className="flex items-center mb-2 ">
                  <label
                    htmlFor="cc"
                    className="w-[70px] text-[#0000008A] font-medium"
                  >
                    Cc
                  </label>
                  <div className="flex-grow flex flex-wrap items-center  p-1 ">
                    {cc.map((email, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2 mb-1 flex items-center"
                      >
                        {email}
                        <button
                          onClick={() => handleEmailRemove(email, setCc, cc)}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      className="focus:outline-none flex-grow"
                      placeholder=""
                      onKeyDown={(e) => handleEmailAddition(e, setCc, cc)}
                    />
                  </div>
                </div>
              )}
              {/* Bcc Input */}
              {showBcc && (
                <div className="flex items-center mb-2">
                  <label
                    htmlFor="bcc"
                    className="w-[70px] text-[#0000008A] font-medium"
                  >
                    Bcc
                  </label>
                  <div className="flex-grow flex flex-wrap items-center  p-1 ">
                    {bcc.map((email, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2 mb-1 flex items-center"
                      >
                        {email}
                        <button
                          onClick={() => handleEmailRemove(email, setBcc, bcc)}
                          className="ml-1 text-blue-500 hover:text-blue-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      className="focus:outline-none flex-grow"
                      placeholder=""
                      onKeyDown={(e) => handleEmailAddition(e, setBcc, bcc)}
                    />
                  </div>
                </div>
              )}
            </div>

            {/*Subject  Input */}
            <div className="flex items-center border-b mb-2 py-2">
              <label
                htmlFor="subject"
                className="w-[70px] text-[#0000008A] font-medium"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="flex-grow focus:outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onFocus={handleFocusOnSubjectOrBody}
              />
            </div>
            {/* Body Input */}
            <div className="flex-grow mt-8">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
                value={body}
                onEditorChange={(newBody) => setBody(newBody)}
                init={{
                  height: 300, // Adjust height as needed
                  menubar: false,
                  plugins: 'lists link',
                  toolbar:
                    'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist | link preview | customFileUpload', // Include your custom button here
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                  setup: (editor) => {
                    // Add your custom button
                    editor.ui.registry.addButton('customFileUpload', {
                      tooltip: 'Add File',
                      icon: 'upload',
                      onAction: () => {
                        // Call your custom file upload logic here
                        customFileUploadButton();
                      },
                    });
                  },
                }}
                textareaName="body"
                inline={false}
                style={{
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div className="w-full resize-none focus:outline-none max-h-[200px] overflow-auto">
              {attachments?.map((file, index: number) => {
                return (
                  <div
                    key={index}
                    className=" bg-[#eeeeee] m-2 p-2 rounded flex justify-between items-center"
                  >
                    <span className="text-sm font-[12px]">
                      {file.name.length > 30
                        ? file.name.slice(0, 30) + '...'
                        : file.name}
                    </span>
                    <div
                      className="cursor-pointer"
                      onClick={() => removeFile(index)}
                    >
                      <X size={16} />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Footer  */}
            <div className=" p-2 flex justify-between mb-10">
              <div>
                <div className="flex space-x-4">
                  <Button
                    handleClick={handleSend}
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-4 rounded ${to?.length == 0 || body == '' || subject === '' ? 'opacity-50' : ''}`}
                    text="Send"
                    type="button"
                    loading={loading}
                    disabled={
                      to?.length > 0 && body != '' && subject != ''
                        ? false
                        : true
                    }
                  />
                </div>
                <p>
                  <span className="text-sm text-[red]">Note:</span>{' '}
                  <span className="text-sm text-[#777777]">
                    Subject,Text Body & Recipients should not be empty
                  </span>
                </p>
              </div>
              <button onClick={handleDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6.50016 18.4167C6.50016 19.425 7.32516 20.25 8.3335 20.25H15.6668C16.6752 20.25 17.5002 19.425 17.5002 18.4167V7.41667H6.50016V18.4167ZM18.4168 4.66667H15.2085L14.2918 3.75H9.7085L8.79183 4.66667H5.5835V6.5H18.4168V4.66667Z"
                    fill="black"
                    fillOpacity="0.54"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Minimized Header */}
      {isMinimized && (
        <div className="fixed bottom-[-5px] right-4 p-2 flex justify-between items-center bg-[#424242] rounded-lg shadow-lg w-[300px]">
          <h2 className="text-[14px] font-medium text-white">New Message</h2>
          <div className="space-x-3 flex">
            <button onClick={() => setIsMinimized(!isMinimized)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2.75 11.2085H12.75V13.2085H2.75V11.2085Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            </button>
            <button onClick={() => setIsFullScreen(!isFullScreen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13 7.44444V3H8.55556L10.3833 4.82778L4.82778 10.3833L3 8.55556V13H7.44444L5.61667 11.1722L11.1722 5.61667L13 7.44444Z"
                  fill="white"
                  fillOpacity="0.6"
                />
              </svg>
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className="text-[#FFFFFF99]"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailComposer;
