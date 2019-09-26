const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form method="POST" action="/wiki/">
    
    <div>
      <label for='name'>Author Name</label>
      <input name='name' type='text' placeholder='Please input author name'>
    </div>
    
    <div>
      <label for='email'>Author Email</label>
      <input name='email' type='text' placeholder='Please input email address'>
    </div>
    
    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input id="title" name="title" type="text" class="form-control" placeholder='Page Title'/>
      </div>
    </div>

    <div>
      <label for='content'>Details</label>
      <textarea name='content' placeholder='Write details here'></textarea>
    </div>
    
    <div>
      <label for='status'>Page Status</label>
      <input name='status' type='text' placeholder='Open or Closed'>
    </div>

    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>
  
  </form>
`);