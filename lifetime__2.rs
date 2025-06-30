struct LineSplitter<'a> {
    data: &'a str,
}

impl<'a> Iterator for LineSplitter<'a> {
    type Item = &'a str;

    fn next(&mut self) -> Option<Self::Item> {
        if self.data.is_empty() {
            None
        } else {
            let pos = self.data.find('\n').unwrap_or(self.data.len());
            let (line, rest) = self.data.split_at(pos);
            self.data = if rest.starts_with('\n') {
                &rest[1..]
            } else {
                rest
            };
            Some(line)
        }
    }
}
