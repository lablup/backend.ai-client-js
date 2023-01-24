export namespace backend {
    export { Client };
    export { ClientConfig };
}
export class Client {
    /**
     * The client API wrapper.
     *
     * @param {ClientConfig} config - the API client-side configuration
     * @param {string} agentSignature - an extra string that will be appended to User-Agent headers when making API requests
     */
    constructor(config: ClientConfig, agentSignature: string);
    ready: boolean;
    code: any;
    sessionId: any;
    kernelType: any;
    clientVersion: string;
    agentSignature: string;
    _config: ClientConfig;
    _managerVersion: any;
    _apiVersion: any;
    _apiVersionMajor: any;
    is_admin: boolean;
    is_superadmin: boolean;
    kernelPrefix: string;
    resourcePreset: ResourcePreset;
    vfolder: VFolder;
    agent: Agent;
    keypair: Keypair;
    image: ContainerImage;
    utils: utils;
    computeSession: ComputeSession;
    sessionTemplate: SessionTemplate;
    resourcePolicy: ResourcePolicy;
    user: User;
    group: Group;
    domain: Domain;
    resources: Resources;
    storageproxy: StorageProxy;
    maintenance: Maintenance;
    scalingGroup: ScalingGroup;
    registry: Registry;
    setting: Setting;
    userConfig: UserConfig;
    service: Service;
    enterprise: Enterprise;
    cloud: Cloud;
    eduApp: EduApp;
    _features: {};
    abortController: AbortController;
    abortSignal: AbortSignal;
    requestTimeout: number;
    /**
     * Return the server-side manager version.
     */
    get managerVersion(): any;
    /**
     * Return the server-side manager version.
     */
    get apiVersion(): any;
    /**
     * Promise wrapper for asynchronous request to Backend.AI manager.
     *
     * @param {Request} rqst - Request object to send
     * @param {Boolean} rawFile - True if it is raw request
     * @param {AbortController.signal} signal - Request signal to abort fetch
     * @param {number} timeout - Custom timeout (sec.) If no timeout is given, default timeout is used.
     * @param {number} retry - an integer to retry this request
     * @param {Object} opts - Options
     */
    _wrapWithPromise(rqst: Request, rawFile?: boolean, signal?: any, timeout?: number, retry?: number, opts?: any): any;
    /**
     * Return the server-side API version.
     *
     * @param {AbortController.signal} signal - Request signal to abort fetch
     *
     */
    getServerVersion(signal?: any): any;
    /**
     * Force API major version
     */
    set APIMajorVersion(arg: any);
    /**
     * Get API major version
     */
    get APIMajorVersion(): any;
    /**
     * Get the server-side manager version.
     *
     * @param {AbortController.signal} signal - Request signal to abort fetch
     */
    get_manager_version(signal?: any): Promise<any>;
    /**
     * Check compatibility of current manager
     */
    supports(feature: any): any;
    _updateFieldCompatibilityByAPIVersion(fields: any): any;
    _updateSupportList(): void;
    /**
     * Return if manager is compatible with given version.
     */
    isManagerVersionCompatibleWith(version: any): boolean;
    /**
     * Return if api is compatible with given version.
     */
    isAPIVersionCompatibleWith(version: any): boolean;
    /**
     * Check if webserver is authenticated. This requires additional webserver package.
     *
     */
    check_login(): Promise<any>;
    /**
     * Login into webserver with given ID/Password. This requires additional webserver package.
     *
     */
    login(): Promise<any>;
    /**
     * Logout from webserver. This requires additional webserver package.
     *
     */
    logout(): any;
    /**
     * Login into webserver with auth cookie token. This requires additional webserver package.
     *
     */
    token_login(): Promise<any>;
    /**
     * Leave from manager user. This requires additional webserver package.
     *
     */
    signout(userid: any, password: any): Promise<any>;
    /**
     * Update user's full_name.
     */
    update_full_name(email: any, fullName: any): Promise<any>;
    /**
     * Update user's password.
     *
     */
    update_password(oldPassword: any, newPassword: any, newPassword2: any): Promise<any>;
    /**
     * Return the resource slots.
     */
    get_resource_slots(): Promise<any>;
    /**
     * Create a compute session if the session for the given sessionId does not exists.
     * It returns the information for the existing session otherwise, without error.
     *
     * @param {string} kernelType - the kernel type (usually language runtimes)
     * @param {string} sessionId - user-defined session ID
     * @param {object} resources - Per-session resource
     * @param {number} timeout - Timeout of request. Default : default fetch value. (5sec.)
     */
    createIfNotExists(kernelType: string, sessionId: string, resources?: object, timeout?: number): Promise<any>;
    /**
     * Create a session with a session template.
     *
     * @param {string} sessionId - the sessionId given when created
     */
    createSessionFromTemplate(templateId: any, image?: any, sessionName?: any, resources?: {}, timeout?: number): Promise<any>;
    /**
     * Obtain the session information by given sessionId.
     *
     * @param {string} sessionId - the sessionId given when created
     */
    get_info(sessionId: string, ownerKey?: any): Promise<any>;
    /**
     * Obtain the session container logs by given sessionId.
     *
     * @param {string} sessionId - the sessionId given when created
     * @param {string | null} ownerKey - owner key to access
     * @param {number} timeout - timeout to wait log query. Set to 0 to use default value.
     */
    get_logs(sessionId: string, ownerKey?: string | null, timeout?: number): Promise<any>;
    /**
     * Obtain the batch session (task) logs by given sessionId.
     *
     * @param {string} sessionId - the sessionId given when created
     */
    getTaskLogs(sessionId: string): any;
    /**
     * Terminate and destroy the kernel session.
     *
     * @param {string} sessionId - the sessionId given when created
     * @param {string|null} ownerKey - owner key when terminating other users' session
     * @param {boolean} forced - force destroy session. Requires admin privilege.
     */
    destroy(sessionId: string, ownerKey?: string | null, forced?: boolean): Promise<any>;
    /**
     * Restart the kernel session keeping its work directory and volume mounts.
     *
     * @param {string} sessionId - the sessionId given when created
     */
    restart(sessionId: string, ownerKey?: any): Promise<any>;
    /**
     * Execute a code snippet or schedule batch-mode executions.
     *
     * @param {string} sessionId - the sessionId given when created
     * @param {string} runId - a random ID to distinguish each continuation until finish (the length must be between 8 to 64 bytes inclusively)
     * @param {string} mode - either "query", "batch", "input", or "continue"
     * @param {string} opts - an optional object specifying additional configs such as batch-mode build/exec commands
     */
    execute(sessionId: string, runId: string, mode: string, code: any, opts: string, timeout?: number): Promise<any>;
    createKernel(kernelType: any, sessionId?: any, resources?: {}, timeout?: number): Promise<any>;
    destroyKernel(sessionId: any, ownerKey?: any): Promise<any>;
    refreshKernel(sessionId: any, ownerKey?: any): Promise<any>;
    runCode(code: any, sessionId: any, runId: any, mode: any): Promise<any>;
    shutdown_service(sessionId: any, service_name: any): Promise<any>;
    upload(sessionId: any, path: any, fs: any): Promise<any>;
    download(sessionId: any, files: any): Promise<any>;
    download_single(sessionId: any, file: any): Promise<any>;
    mangleUserAgentSignature(): string;
    /**
     * Send GraphQL requests
     *
     * @param {string} q - query string for GraphQL
     * @param {string} v - variable string for GraphQL
     * @param {number} timeout - Timeout to force terminate request
     * @param {number} retry - The number of retry when request is failed
     */
    query(q: string, v: string, signal?: any, timeout?: number, retry?: number): Promise<any>;
    /**
     * Generate a RequestInfo object that can be passed to fetch() API,
     * which includes a properly signed header with the configured auth information.
     *
     * @param {string} method - the HTTP method
     * @param {string} queryString - the URI path and GET parameters
     * @param {any} body - an object that will be encoded as JSON in the request body
     */
    newSignedRequest(method: string, queryString: string, body: any): {
        method: string;
        headers: Headers;
        cache: string;
        body: any;
        uri: string;
    };
    /**
     * Same to newRequest() method but it does not sign the request.
     * Use this for unauthorized public APIs.
     *
     * @param {string} method - the HTTP method
     * @param {string} queryString - the URI path and GET parameters
     * @param {any} body - an object that will be encoded as JSON in the request body
     */
    newUnsignedRequest(method: string, queryString: string, body: any): {
        method: any;
        headers: Headers;
        mode: string;
        cache: string;
        uri: string;
    };
    newPublicRequest(method: any, queryString: any, body: any, urlPrefix: any): {
        method: any;
        headers: Headers;
        mode: string;
        cache: string;
        uri: string;
    };
    getAuthenticationString(method: any, queryString: any, dateValue: any, bodyValue: any, content_type?: string): string;
    getCurrentDate(now: any): string;
    sign(key: any, key_encoding: any, msg: any, digest_type: any): string;
    getSignKey(secret_key: any, now: any): string;
    generateSessionId(length?: number, nosuffix?: boolean): string;
    slugify(text: any): any;
    /**
     * fetch existing pubic key of SSH Keypair from container
     * only ssh_public_key will be received.
     */
    fetchSSHKeypair(): Promise<any>;
    /**
     * refresh SSH Keypair from container
     * gets randomly generated keypair (both ssh_public_key and ssh_private_key) will be received.
     */
    refreshSSHKeypair(): Promise<any>;
}
export namespace Client {
    const ERR_SERVER: number;
    const ERR_RESPONSE: number;
    const ERR_REQUEST: number;
    const ERR_ABORT: number;
    const ERR_TIMEOUT: number;
    const ERR_UNKNOWN: number;
}
export class ClientConfig {
    /**
     * Create a ClientConfig object from environment variables.
     */
    static createFromEnv(): ClientConfig;
    /**
     * The client Configuration object.
     *
     * @param {string} accessKey - access key to connect Backend.AI manager
     * @param {string} secretKey - secret key to connect Backend.AI manager
     * @param {string} endpoint  - endpoint of Backend.AI manager
     * @param {string} connectionMode - connection mode. 'API', 'SESSION' is supported. `SESSION` mode requires webserver.
     */
    constructor(accessKey: string, secretKey: string, endpoint: string, connectionMode?: string);
    _apiVersionMajor: string;
    _apiVersion: string;
    _hashType: string;
    _endpoint: string;
    _endpointHost: string;
    _accessKey: string;
    _secretKey: string;
    _userId: string;
    _password: string;
    _proxyURL: any;
    _proxyToken: any;
    _connectionMode: string;
    get accessKey(): string;
    get secretKey(): string;
    get userId(): string;
    get password(): string;
    get endpoint(): string;
    get proxyURL(): any;
    get proxyToken(): any;
    get endpointHost(): string;
    get apiVersion(): string;
    get apiVersionMajor(): string;
    get hashType(): string;
    get connectionMode(): string;
}
declare class ResourcePreset {
    /**
     * Resource Preset API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    urlPrefix: string;
    /**
     * Return the GraphQL Promise object containing resource preset list.
     */
    list(param?: any): Promise<any>;
    /**
     * Return the GraphQL Promise object containing resource preset checking result.
     */
    check(param?: any): Promise<any>;
    /**
     * add resource preset with given name and fields.
     *
     * @param {string} name - resource preset name.
     * @param {json} input - resource preset specification and data. Required fields are:
     * {
     *   'resource_slots': JSON.stringify(total_resource_slots), // Resource slot value. should be Stringified JSON.
     * };
     */
    add(name: string, input: any): Promise<any>;
    /**
     * mutate specified resource preset with given name with new values.
     *
     * @param {string} name - resource preset name to mutate.
     * @param {json} input - resource preset specification and data. Required fields are:
     * {
     *   'resource_slots': JSON.stringify(total_resource_slots), // Resource slot value. should be Stringified JSON.
     * };
     */
    mutate(name: string, input: any): Promise<any>;
    /**
     * delete specified resource preset with given name.
     *
     * @param {string} name - resource preset name to delete.
     */
    delete(name?: string): Promise<any>;
}
declare class VFolder {
    /**
     * The Virtual Folder API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     * @param {string} name - Virtual folder name.
     */
    constructor(client: Client, name?: string);
    client: Client;
    name: string;
    urlPrefix: string;
    /**
     * Get allowed types of folders
     *
     */
    list_allowed_types(): Promise<any>;
    /**
     * Create a Virtual folder on specific host.
     *
     * @param {string} name - Virtual folder name.
     * @param {string} host - Host name to create virtual folder in it.
     * @param {string} group - Virtual folder group name.
     * @param {string} usageMode - Virtual folder's purpose of use. Can be "general" (normal folders), "data" (data storage), and "model" (pre-trained model storage).
     * @param {string} permission - Virtual folder's innate permission.
     * @param {boolean} cloneable - Whether Virtual folder is cloneable or not.
     */
    create(name: string, host?: string, group?: string, usageMode?: string, permission?: string, cloneable?: boolean): Promise<any>;
    /**
     * Clone selected Virtual folder
     *
     * @param {json} input - parameters for cloning Vfolder
     * @param {boolean} input.cloneable - whether new cloned Vfolder is cloneable or not
     * @param {string} input.permission - permission for new cloned Vfolder. permission should one of the following: 'ro', 'rw', 'wd'
     * @param {string} input.target_host - target_host for new cloned Vfolder
     * @param {string} input.target_name - name for new cloned Vfolder
     * @param {string} input.usage_mode - Cloned virtual folder's purpose of use. Can be "general" (normal folders), "data" (data storage), and "model" (pre-trained model storage).
     * @param name - source Vfolder name
     */
    clone(input: any, name?: any): Promise<any>;
    /**
     *
     * @param {json} input - parameters for updating folder options of Vfolder
     * @param {boolean} input.cloneable - whether Vfolder is cloneable or not
     * @param {string} input.permission - permission for Vfolder. permission should one of the following: 'ro', 'rw', 'wd'
     * @param name - source Vfolder name
     */
    update_folder(input: any, name?: any): Promise<any>;
    /**
     * List Virtual folders that requested accessKey has permission to.
     */
    list(groupId?: any): Promise<any>;
    /**
     * List Virtual folder hosts that requested accessKey has permission to.
     */
    list_hosts(): Promise<any>;
    /**
     * Information about specific virtual folder.
     */
    info(name?: any): Promise<any>;
    /**
     * Rename a Virtual folder.
     *
     * @param {string} new_name - New virtual folder name.
     */
    rename(new_name?: string): Promise<any>;
    /**
     * Delete a Virtual folder.
     *
     * @param {string} name - Virtual folder name. If no name is given, use name on this VFolder object.
     */
    delete(name?: string): Promise<any>;
    /**
     * Leave an invited Virtual folder.
     *
     * @param {string} name - Virtual folder name. If no name is given, use name on this VFolder object.
     */
    leave_invited(name?: string): Promise<any>;
    /**
     * Upload files to specific Virtual folder.
     *
     * @param {string} path - Path to upload.
     * @param {string} fs - File content to upload.
     * @param {string} name - Virtual folder name.
     */
    upload(path: string, fs: string, name?: string): Promise<any>;
    /**
     * Upload file from formData to specific Virtual folder.
     *
     * @param {string} fss - formData with file specification. formData should contain {src, content, {filePath:filePath}}.
     * @param {string} name - Virtual folder name.
     */
    uploadFormData(fss: string, name?: string): Promise<any>;
    /**
     * Create a upload session for a file to Virtual folder.
     *
     * @param {string} path - Path to upload.
     * @param {string} fs - File object to upload.
     * @param {string} name - Virtual folder name.
     */
    create_upload_session(path: string, fs: string, name?: string): Promise<string>;
    /**
     * Create directory in specific Virtual folder.
     *
     * @param {string} path - Directory path to create.
     * @param {string} name - Virtual folder name.
     * @param {string} parents - create parent folders when not exists (>=APIv6).
     * @param {string} exist_ok - Do not raise error when the folder already exists (>=APIv6).
     */
    mkdir(path: string, name?: string, parents?: string, exist_ok?: string): Promise<any>;
    /**
     * Rename a file inside a virtual folder.
     *
     * @param {string} target_path - path to the target file or directory (with old name).
     * @param {string} new_name - new name of the target.
     * @param {string} name - Virtual folder name that target file exists.
     * @param {string} is_dir - True when the object is directory, false when it is file
     */
    rename_file(target_path: string, new_name: string, name?: string, is_dir?: string): Promise<any>;
    /**
     * Delete multiple files in a Virtual folder.
     *
     * @param {string} files - Files to delete.
     * @param {boolean} recursive - delete files recursively.
     * @param {string} name - Virtual folder name that files are in.
     */
    delete_files(files: string, recursive?: boolean, name?: string): Promise<any>;
    /**
     * Download file from a Virtual folder.
     *
     * @param {string} file - File to download. Should contain full path.
     * @param {string} name - Virtual folder name that files are in.
     * @param {boolean} archive - Download target directory as an archive.
     * @param {boolean} noCache - If true, do not store the file response in any cache. New in API v6.
     */
    download(file: string, name?: string, archive?: boolean, noCache?: boolean): Promise<any>;
    /**
     * Request a download and get the token for direct download.
     *
     * @param {string} file - File to download. Should contain full path.
     * @param {string} name - Virtual folder name that files are in.
     * @param {boolean} archive - Download target directory as an archive.
     */
    request_download_token(file: string, name?: string, archive?: boolean): Promise<any>;
    /**
     * Download file in a Virtual folder with token.
     *
     * @param {string} token - Temporary token to download specific file.
     */
    download_with_token(token?: string): Promise<any>;
    /**
     * Get download URL in a Virtual folder with token.
     *
     * @param {string} token - Temporary token to download specific file.
     */
    get_download_url_with_token(token?: string): string;
    /**
     * List files in specific virtual folder / path.
     *
     * @param {string} path - Directory path to list.
     * @param {string} name - Virtual folder name to look up with.
     */
    list_files(path: string, name?: string): Promise<any>;
    /**
     * Invite someone to specific virtual folder with permission.
     *
     * @param {string} perm - Permission to give to. `rw` or `ro`.
     * @param {array} emails - User E-mail to invite.
     * @param {string} name - Virtual folder name to invite.
     */
    invite(perm: string, emails: any[], name?: string): Promise<any>;
    /**
     * Show invitations to current API key.
     */
    invitations(): Promise<any>;
    /**
     * Accept specific invitation.
     *
     * @param {string} inv_id - Invitation ID.
     */
    accept_invitation(inv_id: string): Promise<any>;
    /**
     * Delete specific invitation.
     *
     * @param {string} inv_id - Invitation ID to delete.
     */
    delete_invitation(inv_id: string): Promise<any>;
    /**
     * List invitees(users who accepted an invitation)
     *
     * @param {string} vfolder_id - vfolder id. If no id is given, all users who accepted the client's invitation will be returned
     */
    list_invitees(vfolder_id?: string): Promise<any>;
    /**
     * Modify an invitee's permission to a shared vfolder
     *
     * @param {json} input - parameters for permission modification
     * @param {string} input.perm - invitee's new permission. permission should one of the following: 'ro', 'rw', 'wd'
     * @param {string} input.user - invitee's uuid
     * @param {string} input.vfolder - id of the vfolder that has been shared to the invitee
     */
    modify_invitee_permission(input: any): Promise<any>;
    /**
     * Share specific users a group-type virtual folder with overriding permission.
     *
     * @param {string} perm - Permission to give to. `rw` or `ro`.
     * @param {array} emails - User E-mail(s) to share.
     * @param {string} name - A group virtual folder name to share.
     */
    share(permission: any, emails: any[], name?: string): Promise<any>;
    /**
     * Unshare a group-type virtual folder from given users.
     *
     * @param {array} emails - User E-mail(s) to unshare.
     * @param {string} name - A group virtual folder name to unshare.
     */
    unshare(emails: any[], name?: string): Promise<any>;
    /**
     * Get the size quota of a vfolder.
     * Only available for some specific file system such as XFS.
     *
     * @param {string} host - Host name of a virtual folder.
     * @param {string} vfolder_id - id of the vfolder.
     */
    get_quota(host: string, vfolder_id: string): Promise<any>;
    /**
     * Set the size quota of a vfolder.
     * Only available for some specific file system such as XFS.
     *
     * @param {string} host - Host name of a virtual folder.
     * @param {string} vfolder_id - id of the vfolder.
     * @param {number} quota - quota size of the vfolder.
     */
    set_quota(host: string, vfolder_id: string, quota: number): Promise<any>;
}
declare class Agent {
    /**
     * Agent API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * List computation agents.
     *
     * @param {string} status - Status to query. Should be one of 'ALIVE', 'PREPARING', 'TERMINATING' and 'TERMINATED'.
     * @param {array} fields - Fields to query. Queryable fields are:  'id', 'status', 'region', 'first_contact', 'cpu_cur_pct', 'mem_cur_bytes', 'available_slots', 'occupied_slots'.
     * @param {number} timeout - timeout for the request. Default uses SDK default. (5 sec.)
     */
    list(status?: string, fields?: any[], timeout?: number): Promise<any>;
}
declare class Keypair {
    /**
     * Keypair API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client, name?: any);
    client: Client;
    name: any;
    /**
     * Information of specific Keypair.
     *
     * @param {string} accessKey - Access key to query information. If client is not authorized as admin, this will be ignored and current API key infomation will be returned.
     * @param {array} fields - Fields to query. Queryable fields are: 'access_key', 'secret_key', 'is_active', 'is_admin', 'user_id', 'created_at', 'last_used',
     'concurrency_limit', 'concurrency_used', 'rate_limit', 'num_queries', 'resource_policy'.
     */
    info(accessKey: string, fields?: any[]): Promise<any>;
    /**
     * List all Keypairs of given user ID.
     *
     * @param {string} userId - User ID to query API keys. If user ID is not given and client is authorized as admin, this will return every keypairs of the manager.
     * @param {array} fields - Fields to query. Queryable fields are: "access_key", 'is_active', 'is_admin', 'user_id', 'created_at', 'last_used',
     'concurrency_used', 'rate_limit', 'num_queries', 'resource_policy'.
     */
    list(userId?: string, fields?: any[], isActive?: boolean): Promise<any>;
    /**
     * Add Keypair with given information.
     *
     * @param {string} userId - User ID for new Keypair.
     * @param {boolean} isActive - is_active state. Default is True.
     * @param {boolean} isAdmin - is_admin state. Default is False.
     * @param {string} resourcePolicy - resource policy name to assign. Default is `default`.
     * @param {integer} rateLimit - API rate limit for 900 seconds. Prevents from DDoS attack.
     */
    add(userId?: string, isActive?: boolean, isAdmin?: boolean, resourcePolicy?: string, rateLimit?: any): Promise<any>;
    /**
     * mutate Keypair for given accessKey.
     *
     * @param {string} accessKey - access key to mutate.
     * @param {json} input - new information for mutation. JSON format should follow:
     * {
     *   'is_active': is_active,
     *   'is_admin': is_admin,
     *   'resource_policy': resource_policy,
     *   'rate_limit': rate_limit
     * }
     */
    mutate(accessKey: string, input: any): Promise<any>;
    /**
     * Delete Keypair with given accessKey
     *
     * @param {string} accessKey - access key to delete.
     */
    delete(accessKey: string): Promise<any>;
}
declare class ContainerImage {
    /**
     * The Container image API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * list container images registered on the manager.
     *
     * @param {array} fields - fields to query. Default fields are: ["name", "tag", "registry", "digest", "installed", "resource_limits { key min max }"]
     * @param {boolean} installed_only - filter images to installed / not installed. true to query installed images only.
     * @param {boolean} system_images - filter images to get system images such as web UI, SFTP server. true to query system images only.
     */
    list(fields?: any[], installed_only?: boolean, system_images?: boolean): Promise<any>;
    /**
     * Modify resource of given image.
     *
     * @param {string} registry - Registry name
     * @param {string} image - image name.
     * @param {string} tag - image tag.
     * @param {object} input - value list to set.
     */
    modifyResource(registry: string, image: string, tag: string, input: object): Promise<any[]>;
    /**
     * Modify label of given image.
     *
     * @param {string} registry - Registry name
     * @param {string} image - image name.
     * @param {string} tag - image tag.
     * @param {string} key - key to change.
     * @param {string} value - value for the key.
     */
    modifyLabel(registry: string, image: string, tag: string, key: string, value: string): Promise<any>;
    /**
     * install specific container images from registry
     *
     * @param {string} name - name to install. it should contain full path with tags. e.g. lablup/python:3.6-ubuntu18.04
     * @param {object} resource - resource to use for installation.
     * @param {string} registry - registry of image. default is 'index.docker.io', which is public Backend.AI docker registry.
     */
    install(name: string, resource?: object, registry?: string): Promise<any>;
    /**
     * uninstall specific container images from registry (TO BE IMPLEMENTED)
     *
     * @param {string} name - name to install. it should contain full path with tags. e.g. lablup/python:3.6-ubuntu18.04
     * @param {string} registry - registry of image. default is 'index.docker.io', which is public Backend.AI docker registry.
     */
    uninstall(name: string, registry?: string): Promise<boolean>;
    /**
     * Get image label information.
     *
     * @param {string} registry - Registry name
     * @param {string} image - image name.
     * @param {string} tag - tag to get.
     */
    get(registry: string, image: string, tag: string): Promise<any>;
}
declare class utils {
    constructor(client: any);
    client: any;
    changeBinaryUnit(value: any, targetUnit?: string, defaultUnit?: string): any;
    elapsedTime(start: any, end: any): string;
    _padding_zeros(n: any, width: any): any;
    /**
     * Limit the boundary of value
     *
     * @param {number} value - input value to be clamped
     * @param {number} min - minimum value of the input value
     * @param {number} max - maximum value of the input vallue
     */
    clamp(value: number, min: number, max: number): number;
    gqlToObject(array: any, key: any): {};
    gqlToList(array: any, key: any): any[];
}
declare class ComputeSession {
    /**
     * The Computate session API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * Get the number of compute sessions with specific conditions.
     *
     * @param {string or array} status - status to query. Default is 'RUNNING'.
     *        Available statuses are: `PREPARING`, `BUILDING`, `PENDING`, `SCHEDULED`, `RUNNING`, `RESTARTING`, `RESIZING`, `SUSPENDED`, `TERMINATING`, `TERMINATED`, `ERROR`.
     * @param {string} accessKey - access key that is used to start compute sessions.
     * @param {number} limit - limit number of query items.
     * @param {number} offset - offset for item query. Useful for pagination.
     * @param {string} group - project group id to query. Default returns sessions from all groups.
     */
    total_count(status?: string, accessKey?: string, limit?: number, offset?: number, group?: string): Promise<any>;
    /**
     * list compute sessions with specific conditions.
     *
     * @param {array} fields - fields to query. Default fields are: ["id", "name", "image", "created_at", "terminated_at", "status", "status_info", "occupied_slots", "cpu_used", "io_read_bytes", "io_write_bytes"].
     * @param {string or array} status - status to query. Default is 'RUNNING'.
     *        Available statuses are: `PREPARING`, `BUILDING`, `PENDING`, `SCHEDULED`, `RUNNING`, `RESTARTING`, `RESIZING`, `SUSPENDED`, `TERMINATING`, `TERMINATED`, `ERROR`.
     * @param {string} accessKey - access key that is used to start compute sessions.
     * @param {number} limit - limit number of query items.
     * @param {number} offset - offset for item query. Useful for pagination.
     * @param {string} group - project group id to query. Default returns sessions from all groups.
     * @param {number} timeout - timeout for the request. Default uses SDK default. (5 sec.)
     */
    list(fields?: any[], status?: string, accessKey?: string, limit?: number, offset?: number, group?: string, timeout?: number): Promise<any>;
    /**
     * list all status of compute sessions.
     *
     * @param {array} fields - fields to query. Default fields are: ["session_name", "lang", "created_at", "terminated_at", "status", "status_info", "occupied_slots", "cpu_used", "io_read_bytes", "io_write_bytes"].
     * @param {String} status - status to query. The default is string with all status combined.
     * @param {string} accessKey - access key that is used to start compute sessions.
     * @param {number} limit - limit number of query items.
     * @param {number} offset - offset for item query. Useful for pagination.
     * @param {string} group - project group id to query. Default returns sessions from all groups.
     * @param {number} timeout - timeout for the request. Default uses SDK default. (5 sec.)
     */
    listAll(fields?: any[], status?: string, accessKey?: string, limit?: number, offset?: number, group?: string, timeout?: number): Promise<any[]>;
    /**
     * get compute session with specific condition.
     *
     * @param {array} fields - fields to query. Default fields are: ["session_name", "lang", "created_at", "terminated_at", "status", "status_info", "occupied_slots", "cpu_used", "io_read_bytes", "io_write_bytes"].
     * @param {string} sessionUuid - session ID to query specific compute session.
     */
    get(fields?: any[], sessionUuid?: string): Promise<any>;
    startService(session: any, app: any, port?: any, envs?: any, args?: any): Promise<any>;
}
declare class SessionTemplate {
    /**
     * The Computate session template API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    urlPrefix: string;
    /**
     * list session templates with specific conditions.
     *
     * @param {array} fields - fields to query. Default fields are: ["id", "name", "image", "created_at", "terminated_at", "status", "status_info", "occupied_slots", "cpu_used", "io_read_bytes", "io_write_bytes"].
     * @param {string or array} status - status to query. Default is 'RUNNING'.
     *        Available statuses are: `PREPARING`, `BUILDING`,`PENDING`, `SCHEDULED`, `RUNNING`, `RESTARTING`, `RESIZING`, `SUSPENDED`, `TERMINATING`, `TERMINATED`, `ERROR`.
     * @param {string} accessKey - access key that is used to start compute sessions.
     * @param {number} limit - limit number of query items.
     * @param {number} offset - offset for item query. Useful for pagination.
     * @param {string} group - project group id to query. Default returns sessions from all groups.
     * @param {number} timeout - timeout for the request. Default uses SDK default. (5 sec.)
     */
    list(listall?: boolean, groupId?: any): Promise<any>;
}
declare class ResourcePolicy {
    /**
     * The Resource Policy  API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * get resource policy with given name and fields.
     *
     * @param {string} name - resource policy name.
     * @param {array} fields - fields to query.
     */
    get(name?: string, fields?: any[]): Promise<any>;
    /**
     * add resource policy with given name and fields.
     *
     * @param {string} name - resource policy name.
     * @param {json} input - resource policy specification and data. Required fields are:
     * {
     *   'default_for_unspecified': 'UNLIMITED', // default resource policy when resource slot is not given. 'UNLIMITED' or 'LIMITED'.
     *   'total_resource_slots': JSON.stringify(total_resource_slots), // Resource slot value. should be Stringified JSON.
     *   'max_concurrent_sessions': concurrency_limit,
     *   'max_containers_per_session': containers_per_session_limit,
     *   'idle_timeout': idle_timeout,
     *   'max_vfolder_count': vfolder_count_limit,
     *   'max_vfolder_size': vfolder_capacity_limit,
     *   'allowed_vfolder_hosts': vfolder_hosts
     * };
     */
    add(name: string, input: any): Promise<any>;
    /**
     * mutate specified resource policy with given name with new values.
     *
     * @param {string} name - resource policy name to mutate. (READ-ONLY)
     * @param {json} input - resource policy specification and data. Required fields are:
     * {
     *   {string} 'default_for_unspecified': 'UNLIMITED', // default resource policy when resource slot is not given. 'UNLIMITED' or 'LIMITED'.
     *   {JSONString} 'total_resource_slots': JSON.stringify(total_resource_slots), // Resource slot value. should be Stringified JSON.
     *   {int} 'max_concurrent_sessions': concurrency_limit,
     *   {int} 'max_containers_per_session': containers_per_session_limit,
     *   {bigint} 'idle_timeout': idle_timeout,
     *   {int} 'max_vfolder_count': vfolder_count_limit,
     *   {bigint} 'max_vfolder_size': vfolder_capacity_limit,
     *   {[string]} 'allowed_vfolder_hosts': vfolder_hosts
     * };
     */
    mutate(name: string, input: any): Promise<any>;
    /**
     * delete specified resource policy that exists in policy list.
     *
     * @param {string} name - resource policy name to delete. (READ-ONLY)
     */
    delete(name?: string): Promise<any>;
}
declare class User {
    /**
     * The user API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * List all registred users.
     *
     * TODO: we need new paginated list API after implementation of server-side dynamic filtering.
     *
     * @param {boolean} is_active - List whether active users or inactive users.
     * @param {json} input - User specification to query. Fields are:
     * {
     *   'username': String,      // User name for given user id.
     *   'password': String,      // Password for user id.
     *   'need_password_change': Boolean, // Let user change password at the next login.
     *   'full_name': String,     // Full name of given user id.
     *   'description': String,   // Description for user.
     *   'is_active': Boolean,    // Flag if user is active or not.
     *   'domain_name': String,   // Domain for user.
     *   'role': String,          // Role for user.
     *   'groups': {id name}  // Group Ids for user. Shoule be list of UUID strings.
     * };
     */
    list(is_active?: boolean, fields?: string[]): Promise<any>;
    /**
     * Get user information.
     *
     * @param {string} email - E-mail address as user id.
     * @param {json} input - User specification to query. Fields are:
     * {
     *   'email': String,         // E-mail for given E-mail (same as user)
     *   'username': String,      // User name for given user id.
     *   'password': String,      // Password for user id.
     *   'need_password_change': Boolean, // Let user change password at the next login.
     *   'full_name': String,     // Full name of given user id.
     *   'description': String,   // Description for user.
     *   'is_active': Boolean,    // Flag if user is active or not.
     *   'domain_name': String,   // Domain for user.
     *   'role': String,          // Role for user.
     *   'groups': List(UUID)  // Group Ids for user. Shoule be list of UUID strings.
     * };
     */
    get(email: string, fields?: string[]): Promise<any>;
    /**
     * add new user with given information.
     *
     * @param {string} email - E-mail address as user id.
     * @param {json} input - User specification to change. Required fields are:
     * {
     *   'username': String,      // User name for given user id.
     *   'password': String,      // Password for user id.
     *   'need_password_change': Boolean, // Let user change password at the next login.
     *   'full_name': String,     // Full name of given user id.
     *   'description': String,   // Description for user.
     *   'is_active': Boolean,    // Flag if user is active or not.
     *   'domain_name': String,   // Domain for user.
     *   'role': String,          // Role for user.
     *   'group_ids': List(UUID)  // Group Ids for user. Shoule be list of UUID strings.
     * };
     */
    create(email: string, input: any): Promise<any>;
    /**
     * modify user information with given user id with new values.
     *
     * @param {string} email - E-mail address as user id.
     * @param {json} input - User specification to change. Required fields are:
     * {
     *   'username': String,      // User name for given user id.
     *   'password': String,      // Password for user id.
     *   'need_password_change': Boolean, // Let user change password at the next login.
     *   'full_name': String,     // Full name of given user id.
     *   'description': String,   // Description for user.
     *   'is_active': Boolean,    // Flag if user is active or not.
     *   'domain_name': String,   // Domain for user.
     *   'role': String,          // Role for user.
     *   'group_ids': List(UUID)  // Group Ids for user. Shoule be list of UUID strings.
     * };
     */
    update(email: string, input: any): Promise<any>;
    /**
     * delete user information with given user id
     *
     * @param {string} email - E-mail address as user id to delete.
     */
    delete(email: string): Promise<any>;
}
declare class Group {
    /**
     * The group API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * List registred groups.
     * @param {boolean} is_active - List whether active users or inactive users.
     * @param {string} domain_name - domain name of group
     * {
     *   'name': String,          // Group name.
     *   'description': String,   // Description for group.
     *   'is_active': Boolean,    // Whether the group is active or not.
     *   'created_at': String,    // Created date of group.
     *   'modified_at': String,   // Modified date of group.
     *   'domain_name': String,   // Domain for group.
     * };
     */
    list(is_active?: boolean, domain_name?: string, fields?: string[]): Promise<any>;
}
declare class Domain {
    /**
     * The domain API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * Get domain information.
     * @param {string} domain_name - domain name of group
     * @param {array} fields - fields to query.  Default fields are: ['name', 'description', 'is_active', 'created_at', 'modified_at', 'total_resource_slots', 'allowed_vfolder_hosts',
     'allowed_docker_registries', 'integration_id', 'scaling_groups']
     * {
     *   'name': String,          // Group name.
     *   'description': String,   // Description for group.
     *   'is_active': Boolean,    // Whether the group is active or not.
     *   'created_at': String,    // Created date of group.
     *   'modified_at': String,   // Modified date of group.
     *   'total_resource_slots': JSOONString,   // Total resource slots
     *   'allowed_vfolder_hosts': [String],   // Allowed virtual folder hosts
     *   'allowed_docker_registries': [String],   // Allowed docker registry lists
     *   'integration_id': [String],   // Integration ids
     *   'scaling_groups': [String],   // Scaling groups
     * };
     */
    get(domain_name?: string, fields?: any[]): Promise<any>;
    list(fields?: string[]): Promise<any>;
    /**
     * Modify domain information.
     * @param {string} domain_name - domain name of group
  
  
     * @param {json} input - Domain specification to change. Required fields are:
     * {
     *   'name': String,          // Group name.
     *   'description': String,   // Description for group.
     *   'is_active': Boolean,    // Whether the group is active or not.
     *   'created_at': String,    // Created date of group.
     *   'modified_at': String,   // Modified date of group.
     *   'total_resource_slots': JSOONString,   // Total resource slots
     *   'allowed_vfolder_hosts': [String],   // Allowed virtual folder hosts
     *   'allowed_docker_registries': [String],   // Allowed docker registry lists
     *   'integration_id': [String],   // Integration ids
     *   'scaling_groups': [String],   // Scaling groups
     * };
     */
    update(domain_name: string, input: any): Promise<any>;
}
declare class Resources {
    constructor(client: any);
    client: any;
    resources: {};
    _init_resource_values(): void;
    agents: any;
    /**
     * Total resource information of Backend.AI cluster.
     *
     * @param {string} status - Resource node status to get information.
     */
    totalResourceInformation(status?: string): Promise<any>;
    /**
     * user statistics about usage.
     *
     */
    user_stats(): Promise<any>;
}
declare class StorageProxy {
    /**
     * Agent API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    /**
     * List storage proxies and its volumes.
     *
     * @param {array} fields - Fields to query. Queryable fields are:  'id', 'backend', 'capabilities'.
     * @param {number} limit - limit number of query items.
     * @param {number} offset - offset for item query. Useful for pagination.
     */
    list(fields?: any[], limit?: number, offset?: number): Promise<any>;
    /**
     * Detail of specific storage proxy / volume.
     *
     * @param {string} host - Virtual folder host.
     * @param {array} fields - Fields to query. Queryable fields are:  'id', 'backend', 'capabilities'.
     */
    detail(host?: string, fields?: any[]): Promise<any>;
}
declare class Maintenance {
    /**
     * The Maintenance API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    urlPrefix: string;
    /**
     * Attach to the background task to listen to events
     * @param {string} task_id - background task id.
     */
    attach_background_task(task_id: string): EventSource;
    /**
     * Rescan image from repository
     * @param {string} registry - registry. default is ''
     */
    rescan_images(registry?: string): Promise<any>;
    recalculate_usage(): Promise<any>;
}
declare class ScalingGroup {
    /**
     * The Scaling Group API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    list_available(): Promise<any>;
    list(group?: string): Promise<any>;
    /**
     * Get the version of WSProxy for a specific scaling group.
     * (NEW) manager version 21.09.
     *
     * @param {string} group - Scaling group name
     */
    getWsproxyVersion(group: string): Promise<any>;
    /**
     * Create a scaling group
     *
     * @param {string} name - Scaling group name
     * @param {string} description - Scaling group description
     * @param {string} wsproxyAddress - wsproxy url (NEW in manager 21.09)
     */
    create(name: string, description?: string, wsproxyAddress?: string): Promise<any>;
    /**
     * Associate a scaling group with a domain
     *
     * @param {string} domain - domain name
     * @param {string} scaling_group - scaling group name
     */
    associate_domain(domain: string, scaling_group: string): Promise<any>;
    /**
     * Modify a scaling group
     *
     * @param {string} name - scaling group name
     * @param {json} input - object containing desired modifications
     * {
     *   'description': String          // description of scaling group
     *   'is_active': Boolean           // active status of scaling group
     *   'driver': String
     *   'driver_opts': JSONString
     *   'scheduler': String
     *   'scheduler_opts': JSONString
     *   'wsproxy_addr': String         // NEW in manager 21.09
     * }
     */
    update(name: string, input: any): Promise<any>;
    /**
     * Delete a scaling group
     *
     * @param {string} name - name of scaling group to be deleted
     */
    delete(name: string): Promise<any>;
}
declare class Registry {
    constructor(client: any);
    client: any;
    list(): Promise<any>;
    set(key: any, value: any): Promise<any>;
    delete(key: any): Promise<any>;
}
declare class Setting {
    /**
     * Setting API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    config: any;
    /**
     * List settings
     *
     * @param {string} prefix - prefix to get. This command will return every settings starting with the prefix.
     */
    list(prefix?: string): Promise<any>;
    /**
     * Get settings
     *
     * @param {string} prefix - prefix to get. This command will return every settings starting with the prefix.
     */
    get(key: any): Promise<any>;
    /**
     * Set a setting
     *
     * @param {string} key - key to add.
     * @param {object} value - value to add.
     */
    set(key: string, value: object): Promise<any>;
    /**
     * Delete a setting
     *
     * @param {string} key - key to delete
     * @param {boolean} prefix - prefix to delete. if prefix is true, this command will delete every settings starting with the key.
     */
    delete(key: string, prefix?: boolean): Promise<any>;
}
declare class UserConfig {
    /**
     * Setting API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    config: any;
    /**
     * Get content of bootstrap script of a keypair.
     */
    get_bootstrap_script(): Promise<any>;
    /**
     * Update bootstrap script of a keypair.
     *
     * @param {string} data - text content of bootstrap script.
     */
    update_bootstrap_script(script: any): Promise<any>;
    /**
     * Create content of script dotfile (.bashrc or .zshrc)
     * @param {string} data - text content of script dotfile
     * @param {string} path - path of script dotfile. (cwd: home directory)
     */
    create(data: string, path: string): Promise<any>;
    /**
     * Get content of script dotfile
     */
    get(): Promise<any>;
    /**
     * Update script dotfile of a keypair.
     *
     * @param {string} data - text content of script dotfile.
     * @param {string} path - path of script dotfile. (cwd: home directory)
     */
    update(data: string, path: string): Promise<any>;
    /**
     * Delete script dotfile of a keypair.
     *
     * @param {string} path - path of script dotfile.
     */
    delete(path: string): Promise<any>;
}
declare class Service {
    /**
     * Service-specific API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    config: any;
    /**
     * Get announcements
     *
     */
    get_announcement(): Promise<any>;
    /**
     * Update announcement
     *
     * @param {boolean} enabled - Enable / disable announcement. Default is True.
     * @param {string} message - Announcement content. Usually in Markdown syntax.
     */
    update_announcement(enabled: boolean, message: string): Promise<any>;
}
declare class Enterprise {
    /**
     * Setting API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    config: any;
    /**
     * Get the current enterprise license.
     */
    getLicense(): Promise<any>;
    certificate: any;
}
declare class Cloud {
    /**
     * Setting API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    config: any;
    /**
     * Check if cloud endpoint is available.
     */
    ping(): Promise<any>;
    /**
     * Verify signup email by JWT token.
     *
     * @param {string} token - JWT token which is delivered to user's email.
     */
    verify_email(token: string): Promise<any>;
    /**
     * Send verification email.
     *
     * @param {string} email - user's email.
     */
    send_verification_email(email: string): Promise<any>;
    /**
     * Send password change email to assist users who forgot their password.
     *
     * @param {string} email - user's email.
     */
    send_password_change_email(email: string): Promise<any>;
    /**
     * Verify JWT token for changing password.
     *
     * @param {string} email - user's email (for verification).
     * @param {string} password - new password.
     * @param {string} token - JWT token which is delivered to user's email.
     */
    change_password(email: string, password: string, token: string): Promise<any>;
}
declare class EduApp {
    /**
     * Setting API wrapper.
     *
     * @param {Client} client - the Client API wrapper object to bind
     */
    constructor(client: Client);
    client: Client;
    config: any;
    /**
     * Check if EduApp endpoint is available.
     */
    ping(): Promise<any>;
    /**
     * Get mount folders for auto-mount.
     */
    get_mount_folders(): Promise<any>;
}
export { Client as BackendAIClient, ClientConfig as BackendAIClientConfig };
