export default function handler(req, res) {
    res.status(200).json({ title: 'Please add GEO param in request Ex. http://localhost:3000/api/trends/IN', 'ListOfGEO': 'India-IN, Australia-AU, Canada-CA, United States-US, United Kingdom-GB' })
  }
  