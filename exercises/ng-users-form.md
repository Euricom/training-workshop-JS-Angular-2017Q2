# Exercise Angular

## Routing & Form

Refactor ng-users to routing & add/update form

- Main Menu: About | List | Panels
- Add view to add/edit user
    * Create model based (reactive) form
- Add 'add' button to add a new user (navigate to add user view)
- Add 'edit' link to table/row to navigate to edit user view
- Add 'delete' link to table/row to remove a user
- Add validation
    * First & lastName is required
    * Email must be an email

## Http Error Handling

- Add timeout and retry on http failure
- Add error handling and reporting
    + Show message on communication failure
- Handle following errors
    + Timeout
    + Http Error (400, 404, 500, ...)
    + Offline (no tcp/ip)

## Custom Http Service

- Create a custom http service
- Register it as a replacement of http
- Move http error handling to this service
- Use EventAggregator to signal AppComponent to display error.
