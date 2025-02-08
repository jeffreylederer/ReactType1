# React/Typescript Project
## Introduction
This application is a rewrite (in react) of an MVC application [Tournament](https://github.com/jeffreylederer/Tournament). That repository explains how the application works. I wrote this react/typescript application to teach myself react and typescript.
It uses a Web API server backend to attach the client with an SQL database.

This a single page application (SPA) that looks like a Win Form application. The major difference is it uses states for URL parameters rather than command line ones.
## React client
I used the following react packages:
- @hookform/resolvers@3.9.1
- axios@1.7.9
- flowbite-react@0.10.2
- react-hook-form@7.54.2
- react-router-dom@7.1.1
- zod@3.24.1

Each of these packages allowed me to write the client application.

### axios
This allowed me to call the web api server methos

### bootstrap
This allowed me to create pages that look correct independent of screen size.

### flowbite-react
This is a UI library forms with TextInput, Checkbox, Select and Button controls

### localstorage
I used localstorage aa a simple way to remember dynamic global values. This includes:
- the identity of the logged in user including the user's role.
- current league that the user is accessing.

###  hookform/resolvers and zod
Zod is a TypeScript-first schema declaration and validation used inside of forms. Hookform/resolvers handles is a hook to attached schemas to submit methods and input validations.

### react-router-dom
React Router is used as a simple, declarative routing library. Its only job is matching the URL to a set of components. It works with link controls to direct the application to the correct component.

### hooks
I used these hooks:
- useEffect - used like a page load in Win Form application for actions when the page loads.
- useState - used like a ViewState in Win Form application except changes to useState forces a refresh of the page
- useCallback - this hook is called whenever that parameters of the hook change.
- useNavigate - like a Win Form Redirect method.


## Web Api Server
This is a standard .Net Core project. It uses controller methods (which are called by the axios method in the client) to access database records and pass the results to the client. It uses Entity Framework as an 
object-relational mapper (ORM).

A clever thing I did was to call Stored Prcoedures on stored procedures with joins. First I created a stored procedure and then created a view that mimics the stored procedure results. Then running Scaffold-DbContex, I was able bring in the model of the view. Here is an example:

     List<TeamMember> list = await _context.TeamMemberViews
         .FromSql($"EXEC TeamMember{id}")
         .ToListAsync();
