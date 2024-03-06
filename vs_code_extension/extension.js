// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
class ProtoFileProvider {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }

    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getChildren(element) {
        if (!element) {
            return this.getProtoFiles();
        }
        return [];
    }

    async getProtoFiles() {
        const files = await vscode.workspace.findFiles('**/*.proto');
        return files.map(file => new ProtoFileItem(file));
    }
}

class ProtoFileItem extends vscode.TreeItem {
    constructor(file) {
        super(file.path, vscode.TreeItemCollapsibleState.None);
        this.file = file;
    }
}     
const launchJsonContent = {
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Go Backend",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${workspaceFolder}",
            "preLaunchTask": "startAll",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        }
    ]
};
const tasksJsonContent = {
    "version": "2.0.0",
    "tasks": [
        {
            "label": "startBunServer",
            "type": "shell",
            "command": "cd frontend && bun run start --no-open",
            "problemMatcher": []
        },
        {
            "label": "startGoBackend",
            "type": "shell",
            "command": "sh start.sh",
        },
        {
            "label": "startAll",
            "dependsOn": ["startBunServer", "startGoBackend"],
            "type": "shell",
            "command": "",
            "problemMatcher": []
        }
    ]
};
const airConfigContent = `
[build]
cmd = "echo 'Building...' && go build -o ./bin/myapp"
bin = "./bin/myapp"
tmp_dir = "tmp"
log = "log"
include_ext = ["js", "go", "py"]
`;

function cloneGrpcJs() {
    vscode.window.showInformationMessage('Möchten Sie @grpc/grpc-js in Ihrem Projekt klonen?', 'Ja', 'Nein')
        .then(async (selection) => {
            if (selection === 'Ja') {
                const terminal = vscode.window.createTerminal({
                    name: "Grpc Clone",
                    cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
                });
                terminal.sendText('git clone -b @grpc/grpc-js@1.9.0 --depth 1 --shallow-submodules https://github.com/grpc/grpc-node');
                terminal.show();
                vscode.window.showInformationMessage('@grpc/grpc-js wurde geklont.');
            } else {
                vscode.window.showInformationMessage('Klonen von @grpc/grpc-js abgebrochen.');
            }
        })
        .catch(() => {
            // Fangen Sie den Fehler ab, falls der Promise abgelaufen ist
        });
}

// Beispielaufruf der Funktion
cloneGrpcJs();
async function installBunAndReact() {
    const terminal = vscode.window.createTerminal({
        name: "Bun Installation",
        cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
    });
    terminal.sendText('curl -fsSL https://bun.sh/install | bash');
    terminal.show();

    vscode.window.showInformationMessage('Bun wurde installiert. Möchten Sie React im frontend Ordner installieren?', 'Ja', 'Nein')
        .then(async (selection) => {
            if (selection === 'Ja') {
                terminal.sendText('mkdir frontend');
                terminal.sendText('bun create react-app frontend');
            } else {
                vscode.window.showInformationMessage('Installation von React abgebrochen.');
            }
        }).then(()=>{
			cloneGrpcJs()
		})
        .catch(() => {
            // Fangen Sie den Fehler ab, falls der Promise abgelaufen ist
        });
}
function createAirConfig() {


    const airConfigPath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/.air.conf';
    vscode.workspace.fs.writeFile(vscode.Uri.file(airConfigPath), Buffer.from(airConfigContent))
        .then(() => {
            vscode.window.showInformationMessage('.air.conf wurde erfolgreich erstellt.');
			installBunAndReact()
        })
		
        .catch(error => {
            vscode.window.showErrorMessage('Fehler beim Erstellen der .air.conf: ' + error.message);
        });
		
}
function modifyLaunchJson() {
    return new Promise((resolve, reject) => {
		const config = vscode.workspace.getConfiguration('slint-node-server');
        const watchPaths = config.get('watchPaths', ["${workspaceFolder}/ui/*", "${workspaceFolder}/src/*"]);
        const watchExtensions = config.get('watchExtensions', "js,slint,py");
		const  nodemonConfig = {
		"type": "node",
		"request": "launch",
		"name": "Launch with Nodemon",
		"program": "${workspaceFolder}/src/main.js",
		"restart": true,
		"runtimeExecutable": "${workspaceFolder}/node_modules/nodemon/bin/nodemon.js",
		"console": "integratedTerminal",
		"internalConsoleOptions": "neverOpen",
		"runtimeArgs": [
			"-e",
			watchExtensions
		]
	};
	watchPaths.forEach(path => {
		nodemonConfig.runtimeArgs.push("--watch", path);
	});

		const launchJsonPath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/.vscode/launch.json';
        vscode.workspace.fs.readFile(vscode.Uri.file(launchJsonPath))
            .then(content => {
				console.log(content)
				const contentString = content.toString();
                const jsonContent = contentString.split('\n')
                    .filter(line => !line.trim().startsWith('//'))
                    .join('\n');
				try {
					const launchJson = JSON.parse(jsonContent);

                launchJson.configurations.push(nodemonConfig);
                return vscode.workspace.fs.writeFile(vscode.Uri.file(launchJsonPath), Buffer.from(JSON.stringify(launchJson, null, 2)));
			}
		 catch (error) {
			vscode.window.showErrorMessage('Fehler beim Lesen der launch.json: ' + error.message);
			reject(error);
		}
            })
			.then(() => {
				vscode.window.showInformationMessage('Nodemon wurde erfolgreich für das Debuggen konfiguriert.');
				startNodemon(nodemonConfig);
				return Promise.resolve(); // Explicitly return a promise
			})
			.catch(error => {
				vscode.window.showErrorMessage('Fehler beim Konfigurieren von Nodemon: ' + error.message);
				reject(error);
			});
    });
}
const cp = require('child_process');
function modifyLaunchJsonAndTasksJson() {
    return new Promise((resolve, reject) => {
        const launchJsonPath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/.vscode/launch.json';
        const tasksJsonPath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/.vscode/tasks.json';

        const launchJsonContent = {
            "version": "0.2.0",
            "configurations": [
                {
                    "name": "Launch Go Backend",
                    "type": "go",
                    "request": "launch",
                    "mode": "auto",
                    "program": "${workspaceFolder}",
                    "preLaunchTask": "startAll",
                    "console": "integratedTerminal",
                    "internalConsoleOptions": "neverOpen"
                }
            ]
        };
        const tasksJsonContent = {
            "version": "2.0.0",
            "tasks": [
                {
                    "label": "startBunServer",
                    "type": "shell",
                    "command": "cd frontend && bun run start --no-open",
                    "problemMatcher": []
                },
                {
                    "label": "startGoBackend",
                    "type": "shell",
                    "command": "sh start_go.sh",
                },
                {
                    "label": "startProxy",
                    "type": "shell",
                    "command": "sh start_proxy.sh",
                },
                
                {
                    "label": "startAll",
                    "dependsOn": ["startBunServer", "startGoBackend"],
                    "type": "shell",
                    "command": "",
                    "problemMatcher": []
                }
            ]
        };

        vscode.workspace.fs.writeFile(vscode.Uri.file(launchJsonPath), Buffer.from(JSON.stringify(launchJsonContent, null, 2)))
            .then(() => vscode.workspace.fs.writeFile(vscode.Uri.file(tasksJsonPath), Buffer.from(JSON.stringify(tasksJsonContent, null, 2))))
            .then(() => {
                vscode.window.showInformationMessage('Air wurde erfolgreich für das Debuggen konfiguriert.');
				createAirConfig()
                resolve();
            })
            .catch(error => {
                vscode.window.showErrorMessage('Fehler beim Konfigurieren von Air: ' + error.message);
                reject(error);
            });
    });
}
async function checkAndInstallAir() {
    return new Promise((resolve, reject) => {
        cp.exec('air -v', (error, stdout, stderr) => {
            if (error) {
                // Air ist nicht installiert, installieren Sie es
                vscode.window.showInformationMessage('Air ist nicht installiert. Installiere Air jetzt...');
                const command = 'curl -sSfL https://raw.githubusercontent.com/cosmtrek/air/master/install.sh | sh -s -- -b $(go env GOPATH)/bin';
                var terminal = vscode.window.createTerminal({
                    name: "Air Installation",
                    cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
                });
                terminal.sendText(command);
         
                terminal.sendText("git clone https://github.com/ji-soft/grcp_go_example_backend")
                terminal.show();
                terminal.sendText("mv grcp_go_example_backend/* ./")
                terminal.show();
                terminal.sendText("rm -rf grcp_go_example_backend")
                terminal.show();
                terminal.sendText("go get google.golang.org/protobuf/cmd/protoc-gen-go")
                terminal.sendText("go get google.golang.org/grpc/cmd/protoc-gen-go-grpc")
                terminal.sendText("export PATH=$PATH:$(go env GOPATH)/bin")

                const launchJsonPath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/.vscode/launch.json';
                const tasksJsonPath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/.vscode/tasks.json';
                vscode.workspace.fs.writeFile(vscode.Uri.file(launchJsonPath), Buffer.from(JSON.stringify(launchJsonContent, null, 2)))
                .then(() => vscode.workspace.fs.writeFile(vscode.Uri.file(tasksJsonPath), Buffer.from(JSON.stringify(tasksJsonContent, null, 2))))
                const airConfigPath = vscode.workspace.workspaceFolders[0].uri.fsPath + '/.air.conf';
                vscode.workspace.fs.writeFile(vscode.Uri.file(airConfigPath), Buffer.from(airConfigContent))
                 terminal = vscode.window.createTerminal({
                    name: "Bun Installation",
                    cwd: vscode.workspace.workspaceFolders[0].uri.fsPath
                });
                terminal.sendText('curl -fsSL https://bun.sh/install | bash');
                terminal.show();
                vscode.window.showInformationMessage('Installation von React abgebrochen.');
                terminal.sendText('mkdir frontend');
                terminal.sendText('bun create react-app frontend');
                vscode.window.showInformationMessage('Installation von React fertig.')
                terminal.sendText('cd frontend')
                terminal.sendText('bun install google-protobuf');
                terminal.sendText('bun install @improbable-eng/grpc-web');
                terminal.sendText('cd ../')


            } else {
                // Air ist installiert, fahren Sie mit der Konfiguration fort
                vscode.window.showInformationMessage('Air ist bereits installiert.');
                reject();
            }
        });
    });

}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('slint-node-server.showSlintWindow', function () {
        // Erstellen Sie eine neue Webview

		const useNodemon = vscode.workspace.getConfiguration('slint-node-server').get('useNodemon');
		checkAndInstallAir();
        const protoFileProvider = new ProtoFileProvider();
        vscode.window.registerTreeDataProvider('protoFiles', protoFileProvider);
        context.subscriptions.push(vscode.commands.registerCommand('protoFiles.refreshEntry', () => protoFileProvider.refresh()));
    
        const watcher = vscode.workspace.createFileSystemWatcher('**/*.proto');
        watcher.onDidChange(uri => {
            vscode.window.showInformationMessage('Proto-Datei geändert. Möchten Sie die Protobufs neu erzeugen?', 'Ja', 'Nein')
                .then(selection => {
                    if (selection === 'Ja') {
                        // Führen Sie hier den Befehl zum Neu-Erzeugen der Protobufs aus
                    }
                });
        });
        context.subscriptions.push(watcher);

		if (!useNodemon) {
			//askUserAboutNodemon()
		//	//askUserToModifyLaunchJson();
			//
		}
		
		const panel = vscode.window.createWebviewPanel(
			'slintPreview', // Identifikator für das WebView-Panel. Sollte eindeutig sein.
			'Slint Preview', // Titel des WebView-Panels.
			vscode.ViewColumn.One, // Spezifiziert, wo das WebView-Panel angezeigt werden soll.
			{} // Webview-Optionen.
		);
	
		// Laden Sie den Inhalt in das WebView-Panel
		panel.webview.html = getWebviewContent();
		// Beispiel: Reagieren auf Nachrichten vom WebView-Panel
panel.webview.onDidReceiveMessage(
    message => {
        switch (message.command) {
            case 'buttonClicked':
                vscode.window.showInformationMessage('Ein Button wurde geklickt!');
                return;
        }
    },
    undefined,
    context.subscriptions
);
	
		// Speichern Sie das Panel in einem Kontext, damit Sie später darauf zugreifen können
		context.subscriptions.push(panel);
		
    });
	context.subscriptions.push(disposable);
	let disposable2 = vscode.commands.registerCommand('slint-node-server.showSettings', function () {
		// Öffnet die Einstellungen für die slint-node-server Erweiterung
		vscode.commands.executeCommand('workbench.action.openSettings', 'slint-node-server');
	});
    context.subscriptions.push(disposable2);
}
function getWebviewContent() {
    return `<h1>Slint Preview</h1><p>Dies ist ein Beispielinhalt für das Slint Preview-Fenster.</p>`;
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}