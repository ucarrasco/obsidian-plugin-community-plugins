const { Plugin, Notice } = require("obsidian");

module.exports = class QuickCommunityPluginsPlugin extends Plugin {
  onload() {
    console.log("QuickCommunityPlugins Plugin loaded");

    this.addCommand({
      id: "open-community-plugins-settings-command",
      name: "Settings",
      callback: () => {
        this.showCommunityPluginsTabIfNeeded();
      },
    });

    this.addCommand({
      id: "browse-community-plugins-command",
      name: "Browse",
      callback: () => {
        this.showCommunityPluginsTabIfNeeded().then((communityPluginsTab) => {
          [...communityPluginsTab.containerEl.querySelectorAll("button")]
            .find((el) => el.textContent.trim() === "Browse")
            .click();
        });
      },
    });
  }

  showCommunityPluginsTabIfNeeded() {
    return new Promise((resolve) => {
      const communityPluginsTab = this.app.setting.settingTabs.find(
        (t) => t.id === "community-plugins"
      );
      if (this.app.setting.activeTab === communityPluginsTab) {
        resolve(communityPluginsTab);
      } else {
        this.app.setting.open();
        this.app.setting.openTabById("community-plugins");
        setTimeout(() => {
          resolve(communityPluginsTab);
        }, 20);
      }
    });
  }

  onunload() {
    console.log("QuickCommunityPlugins Plugin unloaded");
  }
};
