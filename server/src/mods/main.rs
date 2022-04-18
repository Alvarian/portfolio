use bytes::{Bytes};

pub fn print_type_of<T>(_: &T) {
  println!("{}", std::any::type_name::<T>())
}

pub fn unzip_from_buff(buf: Bytes) -> std::string::String {
  // For demonstration purposes we read from an empty buffer.
  // Normally a File object would be used.
  let reader = std::io::Cursor::new(buf);

  let mut archive = zip::read::ZipArchive::new(reader).unwrap();
  let file = archive.by_name("project.txt").unwrap();
  
  std::io::read_to_string(file).unwrap()
}