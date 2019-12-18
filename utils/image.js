const base64Encode = (file) => {
  if (!file) return;
  try {
    return 'data:' + file.mimetype + ';base64,' + Buffer.from(file.buffer).toString('base64');
  } catch (err) {
    return err;
  }
};

export {
  base64Encode,
};
