module.exports = (match) ->
  match '', 'home#show'
  match 'logout', 'auth#logout'
  match 'feed', 'feed#show'
  match 'settings', 'settings#show'
  match 'auth-callback/', 'auth#callback'

  match ':login', 'users#show'
  match ':login/:repoName', 'repos#show'
  match ':login/:repoName/', 'topics#redirect_to_repo'
  match ':login/:repoName/topics', 'topics#redirect_to_repo'
  match ':login/:repoName/topics/', 'topics#redirect_to_repo'
  match ':login/:repoName/topics/:topicNumber', 'topics#show'
