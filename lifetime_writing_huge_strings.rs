struct HtmlTag<'a> {
    name: &'a str,
}

fn get_tag_name<'a>(html: &'a str) -> HtmlTag<'a> {
    let end = html.find('>').unwrap_or(html.len());
    HtmlTag {
        name: &html[1..end],
    }
}

fn main() {
    let html = String::from("<title>Hello</title>");
    let tag = get_tag_name(&html);
    println!("Tag name: {}", tag.name);
}
