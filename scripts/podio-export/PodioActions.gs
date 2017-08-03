function addItem(item_id) {
  var item = Podio.getItem(item_id)
  switch (item.app.name) {
    case 'Clients' : {
      addClient(item)
      sort('Clients', [15,12])
      break
    }
    case 'Subscriptions' : {
      addSubscription(item)
      break
    }
    case 'Routes' : {
      addRoute(item)
      break
    }
    case 'Deliveries' : {
      addDelivery(item)
      break
    }
  }
}
function updateItem(item_id) {
  var item = Podio.getItem(item_id)
  switch (item.app.name) {
    case 'Clients' : {
      updateClient(item)
      sort('Clients', [15,12])
      break
    }
    case 'Subscriptions' : {
      updateSubscription(item)
      break
    }
    case 'Routes' : {
      updateRoute(item)
      break
    }
    case 'Deliveries' : {
      updateDelivery(item)
      break
    }
  }
}
function parseFields(fields) {
  if (!fields || !fields.length) {
    return fields
  }
  var fields = _.map(fields, function(field) {
    if (!field.values) {
      return field
    }
    switch (field.type) {
      case 'app' : {
        if (field.values.length > 1) {
          field.value = _.join(_.map(field.values, 'value.item_id'), ',')
          break
        }
        field.value = field.values[0].value.item_id
        break
      }
      case 'category' : {
        if (field.values.length > 1) {
          field.value = _.join(_.map(field.values, 'value.text'), ',')
          break
        }
        field.value = field.values[0].value.text
        break
      }
      case 'date' : {
        field.value = {start_date : '', end_date: ''}
        field.value.start_date = field.values[0].start_date
        if (!!field.values[0].end_date) {
          field.value.end_date = field.values[0].end_date
        } else {
            field.value.end_date = field.value.start_date
        }
        break
      }
      case 'location' : {
        Logger.log(field)
        if (field.values.length > 0) {
          field.value = field.values[0]
          Logger.log(field.value)
          field.value.city = (!!field.value.city) ? field.value.city : ''
          field.value.map_in_sync = (!!field.value.map_in_sync) ? field.value.map_in_sync : false
          field.value.country = (!!field.value.country) ? field.value.country : ''
          field.value.state = (!!field.value.state) ? field.value.state : ''
          field.value.postal_code = (!!field.value.postal_code) ? field.value.postal_code : ''
          field.value.lat = (!!field.value.lat) ? field.value.lat : ''
          field.value.lng = (!!field.value.lng) ? field.value.lng : ''
          field.value.street_address = (!!field.value.street_address) ? field.value.street_address : ''
          field.value.full_address = (!!field.value.formatted) ? field.value.formatted : ''
        }
        break
      }
      case 'email' : 
      case 'phone' : {
        if (field.values.length > 0) {
          field.value = _.join(_.map(field.values, 'value'), ',')
          field.type = _.join(_.map(field.values, 'type'), ',')
          break
        }
        field.type = field.values[0].type
        field.value = field.values[0].value
        break
      }
      case 'calculation' :
      case 'number' :
      case 'text' : {
        field.value = field.values[0].value
        break
      }
    }
    return field
  })
  return _.keyBy(fields, 'external_id')
}
// Start Client Items //
function clientTemplate(item) {
  var fields = parseFields(item.fields)
  return [
    item.item_id,
    item.app_item_id,
    item.title,
    (!!item.current_revision) ? item.current_revision.revision : 0,
    (!!item.current_revision) ? item.current_revision.created_on : '',
    item.last_event_on,
    (!!item.created_by) ? item.created_by.name : '',
    (!!item.created_on) ? item.created_on : '',
    item.link,
    (!!fields.reference) ? fields.reference.value : '',
    (!!fields.id) ? fields.id.value : '',
    (!!fields.name) ? fields.name.value : '',
    (!!fields.status) ? fields.status.value : '',
    (!!fields.dob) ? fields.dob.value.start_date : '',
    (!!fields.age) ? fields.age.value : '',
    (!!fields['phone-number']) ? fields['phone-number'].type : '',
    (!!fields['phone-number']) ? '' + fields['phone-number'].value : '',
    (!!fields['email-address']) ? fields['email-address'].type : '',
    (!!fields['email-address']) ? fields['email-address'].value : '',
    (!!fields['apt-complex-name']) ? fields['apt-complex-name'].value : '',
    (!!fields.aptunit) ? fields.aptunit.value : '',
    (!!fields.county) ? fields.county.value : '',
    (!!fields.address) ? fields.address.value.full_address : '',
    (!!fields.address) ? fields.address.value.street_address : '',
    (!!fields.address) ? fields.address.value.city : '',
    (!!fields.address) ? fields.address.value.state : '',
    (!!fields.address) ? fields.address.value.postal_code : '',
    (!!fields.address) ? fields.address.value.lat : '',
    (!!fields.address) ? fields.address.value.lng : '',
    (!!fields['service-interests']) ? fields['service-interests'].value : '',
    (!!fields.gender) ? fields.gender.value : '',
    (!!fields['marital-status']) ? fields['marital-status'].value : '',
    (!!fields['va-status']) ? fields['va-status'].value : '',
    (!!fields.mobility) ? fields.mobility.value : '',
    (!!fields['household-size']) ? fields['household-size'].value : '',
    (!!fields['monthly-household-income']) ? fields['monthly-household-income'].value : '',
    (!!fields['income-source']) ? fields['income-source'].value : '',
    (!!fields.raceethnicity) ? fields.raceethnicity.value : '',
    (!!fields['additional-contact-name']) ? fields['additional-contact-name'].value : '',
    (!!fields['additional-contact-phone']) ? fields['additional-contact-phone'].type : '',
    (!!fields['additional-contact-phone']) ? fields['additional-contact-phone'].value : '',
    (!!fields['additional-contact-email']) ? fields['additional-contact-email'].type : '',
    (!!fields['additional-contact-email']) ? fields['additional-contact-email'].value : '',
    (!!fields.notes) ? fields.notes.value : '',
    (!!fields.warnings) ? fields.warnings.value : '',
    (!!fields['id-depreciated']) ? fields['id-depreciated'].value : ''
  ]
}
function addClient(item) {
  newRow('Clients', clientTemplate(item))
}
function updateClient(item) {
  var row = findRow('Clients', item.item_id)
  if (!row)
    return addClient(item)
  return updateRow('Clients', row, clientTemplate(item))
}
function refreshClientData(filters) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Clients").getRange("A2:AT").clearContent()
  var filters = (!filters) ? {limit : 500} : {filters : filters}
  var clients = Podio.filter(ClientsApp, filters)
  if (!clients.items || !clients.items)
    return
  clients = clients.items
  _.each(clients, function(client) {
      addClient(client)
  })
  sort('Clients', [15,12])
}
// End Client Items //

// Start Subscription Items //
function subscriptionTemplate(item) {
  var fields = parseFields(item.fields)
  return [
    item.item_id,
    item.app_item_id,
    item.title,
    (!!item.current_revision) ? item.current_revision.revision : 0,
    (!!item.current_revision) ? item.current_revision.created_on : '',
    item.last_event_on,
    (!!item.created_by) ? item.created_by.name : '',
    (!!item.created_on) ? item.created_on : '',
    item.link,
    (!!fields.reference) ? fields.reference.value : '',
    (!!fields.id) ? fields.id.value : '',
    (!!fields.clients) ? fields.clients.value : '',
    (!!fields.client) ? fields.client.value : '',
    (!!fields.application) ? fields.application.value : '',
    (!!fields.status) ? fields.status.value : '',
    (!!fields.route) ? '' + fields.route.value : '',
    (!!fields['route-name']) ? fields['route-name'].value : '',
    (!!fields['route-order']) ? fields['route-order'].value : '',
    (!!fields['start-date']) ? fields['start-date'].value.start_date : '',
    (!!fields['meals-per-week']) ? fields['meals-per-week'].value : '',
    (!!fields['ensures-per-week']) ? fields['ensures-per-week'].value : '',
    (!!fields['delivery-days']) ? fields['delivery-days'].value : '',
    (!!fields['delivery-standard-schedule']) ? fields['delivery-standard-schedule'].value : '',
    (!!fields['delivery-notes']) ? fields['delivery-notes'].value : '',
    (!!fields['meal-type']) ? fields['meal-type'].value : '',
    (!!fields['drink-type']) ? fields['drink-type'].value : '',
    (!!fields['preference-notes']) ? fields['preference-notes'].value : '',
    (!!fields['suspended-until']) ? fields['suspended-until'].value.start_date : '',
    (!!fields['suspended-until']) ? fields['suspended-until'].value.end_date : '',
    (!!fields['reason-suspended']) ? fields['reason-suspended'].value : '',
    (!!fields['reason-discharged']) ? fields['reason-discharged'].value : '',
    (!!fields['destination-id-depreciated']) ? fields['destination-id-depreciated'].value : '',
    (!!fields.warnings) ? fields.warnings.value : ''
  ]
}
function sortSubscriptions() {
  sort('Subscriptions', [17, 18])
}
function addSubscription(item) {
  newRow('Subscriptions', subscriptionTemplate(item))
  sortSubscriptions()
}
function updateSubscription(item) {
  var row = findRow('Subscriptions', item.item_id)
  if (!row) {
    addSubscription(item)
    return sortSubscriptions()
  }
  updateRow('Subscriptions', row, subscriptionTemplate(item))
  return sortSubscriptions()
}
function refreshSubscriptionData(filters) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Subscriptions").getRange("A2:AT").clearContent()
  var filters = (!filters) ? {limit : 500} : {filters : filters}
  var subs = Podio.filter(SubscriptionsApp, filters)
  if (!subs.items || !subs.items)
    return
  subs = subs.items
  _.each(subs, function(sub) {
      addSubscription(sub)
  })
  sortSubscriptions()
}
// End Subscription Items //

// Start Delivery Items //
function deliveryTemplate(item) {
  var fields = parseFields(item.fields)
  return [
    item.item_id,
    item.app_item_id,
    item.title,
    (!!item.current_revision) ? item.current_revision.revision : 0,
    (!!item.current_revision) ? item.current_revision.created_on : '',
    item.last_event_on,
    (!!item.created_by) ? item.created_by.name : '',
    (!!item.created_on) ? item.created_on : '',
    item.link,
    (!!fields.reference) ? fields.reference.value : '',
    (!!fields.id) ? fields.id.value : '',
    (!!fields['client-name']) ? fields['client-name'].value : '',
    (!!fields.route) ? '' + fields.route.value : '',
    (!!fields['route-order']) ? fields['route-order'].value : '',
    (!!fields.subscription) ? fields.subscription.value : '',
    (!!fields.status) ? '' + fields.status.value : '',
    (!!fields.meals) ? '' + fields.meals.value : '',
    (!!fields['delivery-date']) ? fields['delivery-date'].value.start_date : '',
    (!!fields.title) ? '' + fields.title.value : '',
    (!!fields['reason-undelivered']) ? fields['reason-undelivered'].value : ''
  ]
}
function addDelivery(item) {
  newRow('Deliveries', deliveryTemplate(item))
}
function updateDelivery(item) {
  var row = findRow('Deliveries', item.item_id)
  if (!row)
    return addDelivery(item)
  return updateRow('Deliveries', row, deliveryTemplate(item))
}
function refreshDeliveryData(filters) {
  var filters = (!filters) ? {limit : 500} : {filters : filters}
  var deliveries = Podio.filter(DeliveriesApp, filters)
  if (!deliveries.items || !deliveries.items)
    return
  deliveries = deliveries.items
  _.each(deliveries, function(delivery) {
      addDelivery(sub)
  })
}
// End Delivery Items //

// Start Route Items //
function routeTemplate(item) {
  var fields = parseFields(item.fields)
  return [
    item.item_id,
    item.app_item_id,
    item.title,
    (!!item.current_revision) ? item.current_revision.revision : 0,
    (!!item.current_revision) ? item.current_revision.created_on : '',
    item.last_event_on,
    (!!item.created_by) ? item.created_by.name : '',
    (!!item.created_on) ? item.created_on : '',
    item.link,
    (!!fields.reference) ? fields.reference.value : '',
    (!!fields.id) ? fields.id.value : '',
    (!!fields.title) ? fields.title.value : '',
    (!!fields.status) ? fields.status.value : '',
    (!!fields['delivery-days']) ? fields['delivery-days'].value : '',
    (!!fields.origin) ? fields.origin.value.formatted : '',
    (!!fields.options) ? fields.options.value : '',
    (!!fields.warnings) ? fields.warnings.value : '',
    (!!fields['id-depreceated']) ? fields['id-depreceated'].value : ''
    
  ]
}
function addRoute(item) {
  newRow('Routes', routeTemplate(item))
}
function updateRoute(item) {
  var row = findRow('Routes', item.item_id)
  if (!row)
    return addRoute(item)
  return updateRow('Routes', row, routeTemplate(item))
}
function refreshRouteData(filters) {
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Routes").getRange("A2:AT").clearContent()
  var filters = (!filters) ? {limit : 500} : {filters : filters}
  var routes = Podio.filter(RoutesApp, filters)
  if (!routes.items || !routes.items)
    return
  routes = routes.items
  _.each(routes, function(route) {
      addRoute(route)
  })
}