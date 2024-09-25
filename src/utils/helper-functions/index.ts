import { existsSync, mkdirSync, createWriteStream } from 'fs';

function removeSensitiveFields<T extends object, K extends keyof T>(
  obj: T,
  key: K
) {
  delete obj[key];
  return obj;
}

const validateEmail = (email: string | undefined) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isValidFile = (file: File): boolean => {
  const allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel
    'application/csv', // CSV
    'text/csv', // CSV
  ];

  const allowedExtensions = ['.csv', '.xlsx'];

  // Check MIME type
  if (!allowedMimeTypes.includes(file.type)) {
    return false;
  }

  // Check file extension
  const fileExtension = file.name
    .slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2)
    .toLowerCase();
  if (!allowedExtensions.includes(`.${fileExtension}`)) {
    return false;
  }

  return true;
};

const fileHandling = async (
  tempDir: string,
  tempFilePath: string,
  file: File
) => {
  if (!existsSync(tempDir)) {
    mkdirSync(tempDir, { recursive: true });
  }

  // Save the file to a temporary location
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileStream = createWriteStream(tempFilePath);
  fileStream.write(buffer);
  fileStream.end();

  // Wait for the file stream to finish writing
  await new Promise((resolve, reject) => {
    fileStream.on('finish', resolve);
    fileStream.on('error', reject);
  });
};

const timeConversion = ({ time, unit }: { time: number; unit: string }) => {
  switch (unit) {
    case 'seconds':
      return time * 1000; // Convert seconds to milliseconds
    case 'minutes':
      return time * 60 * 1000; // Convert minutes to milliseconds
    case 'hours':
      return time * 60 * 60 * 1000; // Convert hours to milliseconds
    default:
      return null; // Handle unknown unit
  }
};

export {
  removeSensitiveFields,
  validateEmail,
  isValidFile,
  fileHandling,
  timeConversion,
};
